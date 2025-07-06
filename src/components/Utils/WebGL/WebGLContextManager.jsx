import { useRef, useEffect, useCallback } from 'react';
import * as THREE from 'three';

/**
 * WebGL Context Manager - Centralized WebGL context and resource management
 * Handles context loss/recovery, resource cleanup, and memory management
 */
export class WebGLContextManager {
  constructor() {
    this.contexts = new Map();
    this.resources = new Map();
    this.contextCount = 0;
    this.maxContexts = 4; // Browser-safe limit
    this.isContextLost = false;
    this.recoveryCallbacks = new Set();
  }

  // Register a new WebGL context
  registerContext(id, gl, onContextLost, onContextRestored) {
    if (this.contextCount >= this.maxContexts) {
      console.warn(`WebGL context limit reached (${this.maxContexts}). Consider cleanup.`);
    }

    const contextInfo = {
      id,
      gl,
      onContextLost,
      onContextRestored,
      resources: new Set(),
      isActive: true
    };

    this.contexts.set(id, contextInfo);
    this.contextCount++;

    // Set up context loss/recovery handlers
    this.setupContextHandlers(contextInfo);

    return contextInfo;
  }

  // Setup context loss and recovery handlers
  setupContextHandlers(contextInfo) {
    if (!contextInfo.gl?.domElement) return;

    const handleContextLost = (event) => {
      console.warn(`WebGL context lost for ${contextInfo.id}`);
      event.preventDefault();
      this.isContextLost = true;
      contextInfo.isActive = false;
      
      if (contextInfo.onContextLost) {
        contextInfo.onContextLost(event);
      }
    };

    const handleContextRestored = (event) => {
      console.log(`WebGL context restored for ${contextInfo.id}`);
      this.isContextLost = false;
      contextInfo.isActive = true;
      
      if (contextInfo.onContextRestored) {
        contextInfo.onContextRestored(event);
      }

      // Notify all recovery callbacks
      this.recoveryCallbacks.forEach(callback => callback(contextInfo.id));
    };

    contextInfo.gl.domElement.addEventListener('webglcontextlost', handleContextLost, false);
    contextInfo.gl.domElement.addEventListener('webglcontextrestored', handleContextRestored, false);

    // Store handlers for cleanup
    contextInfo.contextLostHandler = handleContextLost;
    contextInfo.contextRestoredHandler = handleContextRestored;
  }

  // Register a resource for cleanup
  registerResource(contextId, resource, type = 'unknown') {
    const contextInfo = this.contexts.get(contextId);
    if (!contextInfo) return;

    const resourceInfo = {
      resource,
      type,
      contextId,
      createdAt: Date.now()
    };

    contextInfo.resources.add(resourceInfo);
    this.resources.set(resource, resourceInfo);
  }

  // Cleanup specific resource
  cleanupResource(resource) {
    const resourceInfo = this.resources.get(resource);
    if (!resourceInfo) return;

    try {
      // Cleanup based on resource type
      switch (resourceInfo.type) {
        case 'geometry':
          if (resource.dispose) resource.dispose();
          break;
        case 'material':
          if (resource.dispose) resource.dispose();
          break;
        case 'texture':
          if (resource.dispose) resource.dispose();
          break;
        case 'renderer':
          if (resource.dispose) resource.dispose();
          break;
        default:
          if (resource.dispose) resource.dispose();
      }
    } catch (error) {
      console.warn(`Error cleaning up ${resourceInfo.type}:`, error);
    }

    // Remove from tracking
    const contextInfo = this.contexts.get(resourceInfo.contextId);
    if (contextInfo) {
      contextInfo.resources.delete(resourceInfo);
    }
    this.resources.delete(resource);
  }

  // Cleanup all resources for a context
  cleanupContext(contextId) {
    const contextInfo = this.contexts.get(contextId);
    if (!contextInfo) return;

    console.log(`Cleaning up WebGL context: ${contextId}`);

    // Cleanup all resources
    contextInfo.resources.forEach(resourceInfo => {
      this.cleanupResource(resourceInfo.resource);
    });

    // Remove event listeners
    if (contextInfo.gl?.domElement) {
      contextInfo.gl.domElement.removeEventListener('webglcontextlost', contextInfo.contextLostHandler);
      contextInfo.gl.domElement.removeEventListener('webglcontextrestored', contextInfo.contextRestoredHandler);
    }

    // Remove from tracking
    this.contexts.delete(contextId);
    this.contextCount--;
  }

  // Add recovery callback
  addRecoveryCallback(callback) {
    this.recoveryCallbacks.add(callback);
  }

  // Remove recovery callback
  removeRecoveryCallback(callback) {
    this.recoveryCallbacks.delete(callback);
  }

  // Get context stats
  getStats() {
    return {
      activeContexts: this.contextCount,
      maxContexts: this.maxContexts,
      totalResources: this.resources.size,
      isContextLost: this.isContextLost,
      contexts: Array.from(this.contexts.keys())
    };
  }

  // Force cleanup of inactive contexts
  forceCleanup() {
    const inactiveContexts = Array.from(this.contexts.entries())
      .filter(([_, contextInfo]) => !contextInfo.isActive)
      .map(([id, _]) => id);

    inactiveContexts.forEach(id => this.cleanupContext(id));
    
    // Force garbage collection if available
    if (window.gc) {
      window.gc();
    }
  }
}

// Global context manager instance
const contextManager = new WebGLContextManager();

/**
 * Hook for using WebGL context management
 */
export function useWebGLContext(contextId) {
  const contextRef = useRef(null);
  const resourcesRef = useRef(new Set());

  const registerContext = useCallback((gl, onContextLost, onContextRestored) => {
    if (contextRef.current) {
      // Cleanup existing context
      contextManager.cleanupContext(contextRef.current.id);
    }

    contextRef.current = contextManager.registerContext(
      contextId,
      gl,
      onContextLost,
      onContextRestored
    );

    return contextRef.current;
  }, [contextId]);

  const registerResource = useCallback((resource, type) => {
    if (contextRef.current) {
      contextManager.registerResource(contextRef.current.id, resource, type);
      resourcesRef.current.add(resource);
    }
  }, []);

  const cleanup = useCallback(() => {
    if (contextRef.current) {
      contextManager.cleanupContext(contextRef.current.id);
      contextRef.current = null;
    }
    resourcesRef.current.clear();
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      cleanup();
    };
  }, [cleanup]);

  return {
    registerContext,
    registerResource,
    cleanup,
    contextManager,
    isContextLost: contextManager.isContextLost
  };
}

export default contextManager;
