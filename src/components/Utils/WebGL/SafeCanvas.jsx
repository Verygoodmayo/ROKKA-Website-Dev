import React, { useState, useEffect, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { useDOMReady } from '../UI/DOMReadyProvider';

/**
 * SafeCanvas - A wrapper around R3F Canvas that ensures safe initialization
 * Prevents the "Cannot read properties of null (reading 'addEventListener')" error
 * by ensuring the DOM element exists before R3F tries to connect to it
 */
export default function SafeCanvas({ children, className, id, style, ...canvasProps }) {
  const [canvasReady, setCanvasReady] = useState(false);
  const [mountCanvas, setMountCanvas] = useState(false);
  const isDOMReady = useDOMReady();
  const containerRef = useRef(null);
  const timeoutRef = useRef(null);

  useEffect(() => {
    if (!isDOMReady) return;

    // Additional safety: ensure container element exists and is in DOM
    const checkContainer = () => {
      if (containerRef.current && document.contains(containerRef.current)) {
        setCanvasReady(true);
        // Add small delay to ensure DOM is fully settled
        timeoutRef.current = setTimeout(() => {
          setMountCanvas(true);
        }, 50);
      } else {
        // Retry if container not ready
        timeoutRef.current = setTimeout(checkContainer, 10);
      }
    };

    checkContainer();

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [isDOMReady]);

  // Enhanced onCreated with additional safety checks
  const handleCanvasCreated = ({ gl, scene, camera, ...rest }) => {
    try {
      // Verify WebGL context and DOM element exist
      if (!gl || !gl.domElement || !gl.domElement.parentNode) {
        console.error('SafeCanvas: Invalid WebGL context or DOM element');
        return;
      }

      // Verify the DOM element is properly connected
      if (!document.contains(gl.domElement)) {
        console.error('SafeCanvas: Canvas element not properly connected to DOM');
        return;
      }

      // Set up enhanced context lost handling
      const handleContextLost = (event) => {
        console.warn('SafeCanvas: WebGL context lost');
        event.preventDefault();
        setMountCanvas(false);
        setCanvasReady(false);
      };

      const handleContextRestored = () => {
        console.log('SafeCanvas: WebGL context restored');
        setCanvasReady(true);
        setTimeout(() => setMountCanvas(true), 100);
      };

      // Add event listeners with null checks
      if (gl.domElement.addEventListener) {
        gl.domElement.addEventListener('webglcontextlost', handleContextLost, false);
        gl.domElement.addEventListener('webglcontextrestored', handleContextRestored, false);
      }

      // Call original onCreated if provided
      if (canvasProps.onCreated) {
        canvasProps.onCreated({ gl, scene, camera, ...rest });
      }

    } catch (error) {
      console.error('SafeCanvas: Error in onCreated handler:', error);
    }
  };

  // Don't render anything until DOM is ready and container exists
  if (!isDOMReady || !canvasReady) {
    return (
      <div 
        ref={containerRef}
        className={className}
        id={id}
        style={{
          width: '100%',
          height: '100%',
          ...style
        }}
      />
    );
  }

  // Don't mount Canvas until we're absolutely sure everything is ready
  if (!mountCanvas) {
    return (
      <div 
        ref={containerRef}
        className={className}
        id={id}
        style={{
          width: '100%',
          height: '100%',
          ...style
        }}
      />
    );
  }

  return (
    <div 
      ref={containerRef}
      className={className}
      id={id}
      style={{
        width: '100%',
        height: '100%',
        ...style
      }}
    >
      <Canvas
        {...canvasProps}
        onCreated={handleCanvasCreated}
        style={{ width: '100%', height: '100%' }}
      >
        {children}
      </Canvas>
    </div>
  );
}
