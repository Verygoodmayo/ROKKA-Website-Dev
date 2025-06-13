import * as THREE from 'three'
import { useThree } from "@react-three/fiber";
import { PerspectiveCamera } from '@react-three/drei';



export default function ParkSceneCamera () {

    useThree(({ camera }) => {
        
        
        camera.rotation.set(10,50,0)
        camera.position.set(100,50,100);
    });

    return (
        <perspectiveCamera           
        >
        </perspectiveCamera>
    )
}