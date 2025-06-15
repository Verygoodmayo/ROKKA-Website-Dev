import { useRef } from 'react'
import { BoxGeometry } from 'three'

export default function FooterGeometry() {
    const bufferGeometry = useRef();

    // Create a BoxGeometry (width, height, depth, widthSegments, heightSegments, depthSegments)
    const geometry = new BoxGeometry(1, 1, 1, 10, 10, 10);

    return (
        <bufferGeometry ref={bufferGeometry} {...geometry.toJSON()}>
            <bufferAttribute
                attach="attributes-position"
                count={geometry.attributes.position.count}
                array={geometry.attributes.position.array}
                itemSize={3}
            />
        </bufferGeometry>
    );
}