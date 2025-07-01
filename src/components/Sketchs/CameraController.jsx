import { useThree } from '@react-three/fiber';
import { useEffect } from 'react';

/**
 * Camera controller component for page-level camera positioning
 */
export default function CameraController({ 
    position = [0, 0, 0.25],
    lookAt = [0, 0, 0],
    fov = 75,
    near = 0.1,
    far = 1000 
}) {
    const { camera } = useThree();

    useEffect(() => {
        // Set camera position
        if (Array.isArray(position) && position.length === 3) {
            camera.position.set(position[0], position[1], position[2]);
        }
        
        // Set camera look-at target
        if (Array.isArray(lookAt) && lookAt.length === 3) {
            camera.lookAt(lookAt[0], lookAt[1], lookAt[2]);
        }
        
        // Set camera properties
        if (camera.isPerspectiveCamera) {
            camera.fov = fov;
            camera.near = near;
            camera.far = far;
            camera.updateProjectionMatrix();
        }
    }, [camera, position, lookAt, fov, near, far]);

    return null; // This component doesn't render anything
}
