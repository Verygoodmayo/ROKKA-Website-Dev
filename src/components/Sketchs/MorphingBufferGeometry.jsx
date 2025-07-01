import { useRef, useMemo, useEffect } from 'react';
import * as THREE from 'three';

/**
 * Morphing buffer geometry component that smoothly transitions between two geometries
 */
export default function MorphingBufferGeometry({
    sourceGeometry,
    targetGeometry,
    isMorphing = false,
    morphProgress = 0.0, // 0.0 = source, 1.0 = target
}) {
    const bufferGeometry = useRef();
    const positionAttribute = useRef();

    // Debug: Log prop changes
    useEffect(() => {
        console.log('🔄 MorphingBufferGeometry props updated:', {
            isMorphing,
            morphProgress,
            hasSource: !!sourceGeometry,
            hasTarget: !!targetGeometry
        });
    }, [isMorphing, morphProgress, sourceGeometry, targetGeometry]);

    // Prepare geometry data ONCE (expensive operation)
    const { sourceArray, targetArray, reference, vertexCount } = useMemo(() => {
        if (!sourceGeometry || !targetGeometry) {
            console.warn('⚠️ Missing geometries for morphing');
            return { 
                sourceArray: new Float32Array(), 
                targetArray: new Float32Array(), 
                reference: new Float32Array(), 
                vertexCount: 0 
            };
        }

        const sourcePositions = sourceGeometry.attributes.position.array;
        const targetPositions = targetGeometry.attributes.position.array;
        
        const sourceCount = sourceGeometry.attributes.position.count;
        const targetCount = targetGeometry.attributes.position.count;
        
        console.log('🔧 Preparing morphing geometries:', {
            sourceCount,
            targetCount,
            sourceType: sourceGeometry.type,
            targetType: targetGeometry.type
        });
        
        // Use the maximum vertex count for smooth morphing
        const maxCount = Math.max(sourceCount, targetCount);
        
        const reference = new Float32Array(maxCount * 2);

        // Prepare source and target position arrays with proper scaling
        const sourceArray = new Float32Array(maxCount * 3);
        const targetArray = new Float32Array(maxCount * 3);

        // Fill source positions (scale down by 100 like IcoBufferGeometry)
        for (let i = 0; i < maxCount; i++) {
            const sourceIndex = i % sourceCount;
            sourceArray[i * 3 + 0] = sourcePositions[sourceIndex * 3 + 0] / 100;
            sourceArray[i * 3 + 1] = sourcePositions[sourceIndex * 3 + 1] / 100;
            sourceArray[i * 3 + 2] = sourcePositions[sourceIndex * 3 + 2] / 100;
        }

        // Fill target positions (scale down by 100)
        for (let i = 0; i < maxCount; i++) {
            const targetIndex = i % targetCount;
            targetArray[i * 3 + 0] = targetPositions[targetIndex * 3 + 0] / 100;
            targetArray[i * 3 + 1] = targetPositions[targetIndex * 3 + 1] / 100;
            targetArray[i * 3 + 2] = targetPositions[targetIndex * 3 + 2] / 100;
        }

        // Generate reference coordinates ONCE
        for (let i = 0; i < maxCount; i++) {
            reference[i * 2 + 0] = (i % maxCount) / maxCount;
            reference[i * 2 + 1] = ~~(i / maxCount) / maxCount;
        }

        console.log('✅ Morphing geometry setup complete:', { maxCount });
        return { sourceArray, targetArray, reference, vertexCount: maxCount };
    }, [sourceGeometry, targetGeometry]); // Only recalculate when geometries change

    // Update positions efficiently when morphProgress changes
    useEffect(() => {
        if (positionAttribute.current && sourceArray.length > 0 && targetArray.length > 0) {
            const positions = positionAttribute.current.array;
            
            // Fast interpolation loop (only when morphProgress changes)
            for (let i = 0; i < vertexCount; i++) {
                const i3 = i * 3;
                positions[i3 + 0] = THREE.MathUtils.lerp(sourceArray[i3 + 0], targetArray[i3 + 0], morphProgress);
                positions[i3 + 1] = THREE.MathUtils.lerp(sourceArray[i3 + 1], targetArray[i3 + 1], morphProgress);
                positions[i3 + 2] = THREE.MathUtils.lerp(sourceArray[i3 + 2], targetArray[i3 + 2], morphProgress);
            }
            
            positionAttribute.current.needsUpdate = true;
            
            // Debug: Log morph updates (throttled)
            if (morphProgress === 0.0 || morphProgress === 1.0 || Math.random() < 0.01) {
                console.log('🔄 Morph update:', { morphProgress, vertexCount });
            }
        }
    }, [morphProgress, sourceArray, targetArray, vertexCount]);

    return (
        <bufferGeometry ref={bufferGeometry}>
            <bufferAttribute
                ref={positionAttribute}
                attach='attributes-position'
                count={vertexCount}
                array={new Float32Array(vertexCount * 3)} // Initialize with correct size
                itemSize={3}
            />
            <bufferAttribute
                attach='attributes-reference'
                name='reference'
                array={reference}
                count={reference.length / 2}
                itemSize={2}
            />
        </bufferGeometry>
    );
}
