import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Canvas } from '@react-three/fiber';
import * as THREE from 'three';
import { useDOMReady } from './DOMReadyProvider';

/**
 * MonitoringWebGLManager - Specialized WebGL context manager for monitoring page
 * Handles context loss/recovery, resource cleanup, and memory management
 */
class MonitoringWebGLManager {
  constructor() {
    this.context = null;
    this.resources = new Set();
    this.isContextLost = false;
    this.recoveryCallbacks = new Set();
    this.cleanupCallbacks = new Set();
  }

  // Register WebGL context with recovery handlers
  registerContext(gl, onContextLost, onContextRestored) {
    this.context = gl;
    
    if (!gl?.domElement) {
      console.error('MonitoringWebGLManager: Invalid WebGL context');
      return false;
    }

    // Setup context loss handlers
    const handleContextLost = (event) => {
      console.warn('MonitoringWebGLManager: WebGL context lost');
      event.preventDefault();
      this.isContextLost = true;
      
      if (onContextLost) {
        onContextLost(event);
      }
    };

    const handleContextRestored = (event) => {
      console.log('MonitoringWebGLManager: WebGL context restored');
      this.isContextLost = false;
      
      if (onContextRestored) {
        onContextRestored(event);
      }

      // Notify recovery callbacks
      this.recoveryCallbacks.forEach(callback => callback());
    };

    try {
      gl.domElement.addEventListener('webglcontextlost', handleContextLost, false);
      gl.domElement.addEventListener('webglcontextrestored', handleContextRestored, false);
      
      // Store handlers for cleanup
      this.contextLostHandler = handleContextLost;
      this.contextRestoredHandler = handleContextRestored;
      
      return true;
    } catch (error) {
      console.error('MonitoringWebGLManager: Error setting up context handlers:', error);
      return false;
    }
  }

  // Register resource for cleanup
  registerResource(resource, type = 'unknown') {
    const resourceInfo = {
      resource,
      type,
      createdAt: Date.now()
    };
    
    this.resources.add(resourceInfo);
    return resourceInfo;
  }

  // Add recovery callback
  addRecoveryCallback(callback) {
    this.recoveryCallbacks.add(callback);
  }

  // Add cleanup callback
  addCleanupCallback(callback) {
    this.cleanupCallbacks.add(callback);
  }

  // Cleanup specific resource
  cleanupResource(resourceInfo) {
    try {
      const { resource, type } = resourceInfo;
      
      switch (type) {
        case 'geometry':
          if (resource?.dispose) resource.dispose();
          break;
        case 'material':
          if (resource?.dispose) resource.dispose();
          break;
        case 'texture':
          if (resource?.dispose) resource.dispose();
          break;
        case 'renderer':
          if (resource?.dispose) resource.dispose();
          break;
        default:
          if (resource?.dispose) resource.dispose();
      }
    } catch (error) {
      console.warn(`MonitoringWebGLManager: Error cleaning up ${resourceInfo.type}:`, error);
    }
    
    this.resources.delete(resourceInfo);
  }

  // Full cleanup
  cleanup() {
    console.log('MonitoringWebGLManager: Starting cleanup');
    
    // Cleanup all resources
    this.resources.forEach(resourceInfo => {
      this.cleanupResource(resourceInfo);
    });
    
    // Call cleanup callbacks
    this.cleanupCallbacks.forEach(callback => {
      try {
        callback();
      } catch (error) {
        console.warn('MonitoringWebGLManager: Error in cleanup callback:', error);
      }
    });
    
    // Remove event listeners
    if (this.context?.domElement) {
      try {
        this.context.domElement.removeEventListener('webglcontextlost', this.contextLostHandler);
        this.context.domElement.removeEventListener('webglcontextrestored', this.contextRestoredHandler);
      } catch (error) {
        console.warn('MonitoringWebGLManager: Error removing event listeners:', error);
      }
    }
    
    // Clear references
    this.context = null;
    this.resources.clear();
    this.recoveryCallbacks.clear();
    this.cleanupCallbacks.clear();
    
    console.log('MonitoringWebGLManager: Cleanup complete');
  }

  // Get status
  getStatus() {
    return {
      hasContext: !!this.context,
      isContextLost: this.isContextLost,
      resourceCount: this.resources.size,
      recoveryCallbacks: this.recoveryCallbacks.size,
      cleanupCallbacks: this.cleanupCallbacks.size
    };
  }
}

/**
 * MonitoringCanvas - Enhanced Canvas specifically for monitoring page
 * Provides robust WebGL context management with automatic recovery
 */
export default function MonitoringCanvas({ 
  children, 
  className = "monitoring-canvas", 
  id = "monitoring-canvas",
  style = {},
  fallbackComponent = null,
  autoRecover = true,
  recoveryDelay = 2000,
  onContextReady = null,
  onContextLost = null,
  onContextRestored = null,
  ...canvasProps 
}) {
  const [canvasReady, setCanvasReady] = useState(false);
  const [contextLost, setContextLost] = useState(false);
  const [recovering, setRecovering] = useState(false);
  const [error, setError] = useState(null);
  
  const isDOMReady = useDOMReady();
  const containerRef = useRef(null);
  const managerRef = useRef(new MonitoringWebGLManager());
  const recoveryTimeoutRef = useRef(null);
  const mountTimeoutRef = useRef(null);

  // Context lost handler
  const handleContextLost = useCallback((event) => {
    console.warn(`MonitoringCanvas: WebGL context lost for ${id}`);
    setContextLost(true);
    setError('WebGL context lost');
    
    if (onContextLost) {
      onContextLost(event);
    }
    
    if (autoRecover) {
      setRecovering(true);
      recoveryTimeoutRef.current = setTimeout(() => {
        console.log(`MonitoringCanvas: Attempting recovery for ${id}`);
        setContextLost(false);
        setRecovering(false);
        setError(null);
        // Force re-render
        setCanvasReady(false);
        setTimeout(() => setCanvasReady(true), 100);
      }, recoveryDelay);
    }
  }, [id, autoRecover, recoveryDelay, onContextLost]);

  // Context restored handler
  const handleContextRestored = useCallback((event) => {
    console.log(`MonitoringCanvas: WebGL context restored for ${id}`);
    setContextLost(false);
    setRecovering(false);
    setError(null);
    
    if (onContextRestored) {
      onContextRestored(event);
    }
    
    if (recoveryTimeoutRef.current) {
      clearTimeout(recoveryTimeoutRef.current);
      recoveryTimeoutRef.current = null;
    }
  }, [id, onContextRestored]);

  // Enhanced onCreated with monitoring-specific optimizations
  const handleCanvasCreated = useCallback(({ gl, scene, camera, ...rest }) => {
    try {
      // Verify WebGL context
      if (!gl || !gl.domElement) {
        throw new Error('Invalid WebGL context or DOM element');
      }

      // Register context with manager
      const success = managerRef.current.registerContext(
        gl, 
        handleContextLost, 
        handleContextRestored
      );
      
      if (!success) {
        throw new Error('Failed to register WebGL context');
      }

      // Register core resources
      managerRef.current.registerResource(scene, 'scene');
      managerRef.current.registerResource(camera, 'camera');
      managerRef.current.registerResource(gl, 'renderer');

      // Monitoring-specific GL optimizations
      gl.setClearColor(0x000000, 0);
      gl.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      gl.outputColorSpace = THREE.SRGBColorSpace;
      
      // Conservative memory settings for monitoring
      gl.capabilities.maxTextures = Math.min(gl.capabilities.maxTextures, 8);
      gl.debug.checkShaderErrors = false; // Disable in production
      
      console.log(`MonitoringCanvas: WebGL context initialized for ${id}`);
      console.log('Manager status:', managerRef.current.getStatus());

      // Notify parent component
      if (onContextReady) {
        onContextReady({ gl, scene, camera, manager: managerRef.current });
      }

      // Call original onCreated if provided
      if (canvasProps.onCreated) {
        canvasProps.onCreated({ gl, scene, camera, ...rest });
      }

    } catch (error) {
      console.error(`MonitoringCanvas: Error in onCreated for ${id}:`, error);
      setError(error.message);
    }
  }, [id, handleContextLost, handleContextRestored, onContextReady, canvasProps.onCreated]);

  // DOM ready and mounting logic
  useEffect(() => {
    if (!isDOMReady) return;

    const checkContainer = () => {
      if (containerRef.current && document.contains(containerRef.current)) {
        mountTimeoutRef.current = setTimeout(() => {
          setCanvasReady(true);
        }, 100);
      } else {
        mountTimeoutRef.current = setTimeout(checkContainer, 50);
      }
    };

    checkContainer();

    return () => {
      if (mountTimeoutRef.current) {
        clearTimeout(mountTimeoutRef.current);
      }
    };
  }, [isDOMReady]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (recoveryTimeoutRef.current) {
        clearTimeout(recoveryTimeoutRef.current);
      }
      if (mountTimeoutRef.current) {
        clearTimeout(mountTimeoutRef.current);
      }
      managerRef.current.cleanup();
    };
  }, []);

  // Manual recovery function
  const handleManualRecovery = useCallback(() => {
    setError(null);
    setContextLost(false);
    setRecovering(true);
    
    // Force canvas recreation
    setCanvasReady(false);
    setTimeout(() => {
      setCanvasReady(true);
      setRecovering(false);
    }, 500);
  }, []);

  // Render fallback content
  const renderFallback = () => {
    if (fallbackComponent) {
      return fallbackComponent;
    }

    return (
      <div className="monitoring-canvas-fallback" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        background: 'rgba(0, 0, 0, 0.05)',
        color: '#666',
        fontSize: '14px',
        textAlign: 'center',
        padding: '20px'
      }}>
        <div>
          {recovering ? (
            <div>
              <p>🔄 Recovering monitoring visualization...</p>
              <div className="spinner" style={{
                width: '20px',
                height: '20px',
                border: '2px solid #f3f3f3',
                borderTop: '2px solid #00ff88',
                borderRadius: '50%',
                animation: 'spin 1s linear infinite',
                margin: '10px auto'
              }} />
            </div>
          ) : contextLost ? (
            <div>
              <p>⚠️ Monitoring visualization temporarily unavailable</p>
              <p style={{ fontSize: '12px', color: '#999', margin: '10px 0' }}>
                {error || 'WebGL context lost'}
              </p>
              <button 
                onClick={handleManualRecovery}
                style={{
                  padding: '8px 16px',
                  background: '#00ff88',
                  color: '#000',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '12px',
                  fontWeight: 'bold'
                }}
              >
                Retry Monitoring
              </button>
            </div>
          ) : (
            <div>
              <p>🎨 Loading monitoring visualization...</p>
            </div>
          )}
        </div>
      </div>
    );
  };

  // Container style
  const containerStyle = {
    width: '100%',
    height: '100%',
    ...style
  };

  return (
    <div 
      ref={containerRef}
      className={className}
      id={id}
      style={containerStyle}
    >
      {!isDOMReady || !canvasReady || contextLost || error ? (
        renderFallback()
      ) : (
        <Canvas
          {...canvasProps}
          onCreated={handleCanvasCreated}
          style={{ width: '100%', height: '100%' }}
        >
          {children}
        </Canvas>
      )}
      
      {/* CSS for spinner animation */}
      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

// Export manager for external access
export { MonitoringWebGLManager };
