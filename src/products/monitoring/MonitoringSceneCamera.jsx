import { useThree } from '@react-three/fiber';
import { useEffect } from 'react';

export default function MonitoringSceneCamera({ 
    cameraPositionX = 0, 
    cameraPositionY = 0, 
    cameraPositionZ = 200,
    meshPositionX = 0,
    meshPositionY = 0,
    meshPositionZ = 0
}) {
    const { camera } = useThree();

    useEffect(() => {
        // Set camera position from props
        camera.position.set(cameraPositionX, cameraPositionY, cameraPositionZ);
        camera.lookAt(meshPositionX, meshPositionY, meshPositionZ); // Look at the mesh position
        camera.updateProjectionMatrix();
    }, [camera, cameraPositionX, cameraPositionY, cameraPositionZ, meshPositionX, meshPositionY, meshPositionZ]);

    return null;
}
