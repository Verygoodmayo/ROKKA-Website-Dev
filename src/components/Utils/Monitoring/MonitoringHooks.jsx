import { useRef, useEffect, useCallback } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { useWebGLContext } from '../WebGL/WebGLContextManager';

/**
 * Hook for managing shader materials with proper cleanup and resource management
 */
export function useShaderMaterial(contextId, shaderConfig) {
  const materialRef = useRef(null);
  const uniformsRef = useRef({});
  const { registerResource } = useWebGLContext(contextId);
  const { size } = useThree();

  // Initialize material with uniforms
  useEffect(() => {
    if (!materialRef.current) return;

    const material = materialRef.current;
    
    // Initialize uniforms
    if (material.uniforms) {
      uniformsRef.current = material.uniforms;
      
      // Register material for cleanup
      registerResource(material, 'material');
      
      // Set initial values
      if (material.uniforms.u_time) {
        material.uniforms.u_time.value = 0.0;
      }
      if (material.uniforms.u_resolution) {
        material.uniforms.u_resolution.value.set(size.width, size.height);
      }
      if (material.uniforms.isMobile) {
        material.uniforms.isMobile.value = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      }
    }
  }, [registerResource, size]);

  // Update uniforms safely
  const updateUniforms = useCallback((updates) => {
    if (!materialRef.current?.uniforms) return;

    try {
      Object.entries(updates).forEach(([key, value]) => {
        if (materialRef.current.uniforms[key]) {
          if (materialRef.current.uniforms[key].value?.set && Array.isArray(value)) {
            materialRef.current.uniforms[key].value.set(...value);
          } else {
            materialRef.current.uniforms[key].value = value;
          }
        }
      });
    } catch (error) {
      console.warn('Error updating shader uniforms:', error);
    }
  }, []);

  // Handle resize
  useEffect(() => {
    updateUniforms({
      u_resolution: [size.width, size.height]
    });
  }, [size, updateUniforms]);

  return {
    materialRef,
    updateUniforms,
    uniforms: uniformsRef.current
  };
}

/**
 * Hook for managing mouse interactions with proper event cleanup
 */
export function useMouseInteraction(updateUniforms) {
  const mouseRef = useRef({ x: 0.5, y: 0.5 });
  const mouseClickRef = useRef({ x: 0.5, y: 0.5, time: 0.0, active: false });
  const handlersRef = useRef({});

  useEffect(() => {
    const handleMouseMove = (event) => {
      if (!event || typeof event.clientX !== 'number' || typeof event.clientY !== 'number') return;
      
      try {
        const rect = {
          left: 0,
          top: 0,
          width: window.innerWidth,
          height: window.innerHeight
        };
        
        mouseRef.current.x = Math.max(0, Math.min(1, (event.clientX - rect.left) / rect.width));
        mouseRef.current.y = Math.max(0, Math.min(1, 1.0 - ((event.clientY - rect.top) / rect.height)));
        
        updateUniforms({
          u_mouse: [mouseRef.current.x, mouseRef.current.y]
        });
      } catch (error) {
        console.warn('Mouse move handler error:', error);
      }
    };

    const handleMouseClick = (event) => {
      if (!event || typeof event.clientX !== 'number' || typeof event.clientY !== 'number') return;
      
      try {
        const rect = {
          left: 0,
          top: 0,
          width: window.innerWidth,
          height: window.innerHeight
        };
        
        mouseClickRef.current.x = Math.max(0, Math.min(1, (event.clientX - rect.left) / rect.width));
        mouseClickRef.current.y = Math.max(0, Math.min(1, 1.0 - ((event.clientY - rect.top) / rect.height)));
        mouseClickRef.current.time = 0.0;
        mouseClickRef.current.active = true;
        
        updateUniforms({
          u_mouseClick: [mouseClickRef.current.x, mouseClickRef.current.y, mouseClickRef.current.time, 1.0]
        });
      } catch (error) {
        console.warn('Mouse click handler error:', error);
      }
    };

    // Store handlers for cleanup
    handlersRef.current = { handleMouseMove, handleMouseClick };

    if (typeof window !== 'undefined') {
      window.addEventListener('mousemove', handleMouseMove, { passive: true });
      window.addEventListener('click', handleMouseClick, { passive: true });
    }

    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('mousemove', handlersRef.current.handleMouseMove);
        window.removeEventListener('click', handlersRef.current.handleMouseClick);
      }
    };
  }, [updateUniforms]);

  return {
    mouseRef,
    mouseClickRef
  };
}

/**
 * Hook for managing animation loop with proper cleanup
 */
export function useAnimationLoop(updateUniforms, mouseClickRef, timeSpeed = 1.0) {
  const clockRef = useRef(0);

  useFrame((state) => {
    try {
      const { clock } = state;
      
      // Update time
      clockRef.current = clock.elapsedTime * timeSpeed;
      
      // Update mouse click animation
      if (mouseClickRef.current.active) {
        mouseClickRef.current.time += clock.getDelta();
        if (mouseClickRef.current.time > 3.0) {
          mouseClickRef.current.active = false;
        }
      }

      // Update uniforms
      updateUniforms({
        u_time: clockRef.current,
        u_mouseClick: [
          mouseClickRef.current.x,
          mouseClickRef.current.y,
          mouseClickRef.current.time,
          mouseClickRef.current.active ? 1.0 : 0.0
        ]
      });
    } catch (error) {
      console.warn('Animation loop error:', error);
    }
  });

  return clockRef.current;
}

/**
 * Hook for managing geometry with proper cleanup
 */
export function useGeometry(contextId, GeometryComponent) {
  const geometryRef = useRef(null);
  const { registerResource } = useWebGLContext(contextId);

  useEffect(() => {
    if (geometryRef.current) {
      registerResource(geometryRef.current, 'geometry');
    }
  }, [registerResource]);

  return geometryRef;
}
