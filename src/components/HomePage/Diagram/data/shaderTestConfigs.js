// Shader Control Test Configurations
// Use these configurations to test different shader effects

export const testConfigurations = {
    // Calm and subtle
    minimal: {
        frequency: 0.1,
        amplitude: 1.5,
        maxDistance: 2.0,
        timeSpeed: 0.2,
        noiseScale: 0.8,
        noiseDensity: 0.6,
        particleSize: 0.8,
        colorIntensity: 0.7,
        mouseInfluenceStrength: 0.3,
        noiseOctaves: 2.0,
        noiseLacunarity: 1.8,
        noiseGain: 0.4,
        turbulenceStrength: 0.5,
        flowDirection: 0.0,
        waveSpeed: 0.5,
        distortionStrength: 0.7,
        particleColor: [0.9, 0.9, 0.9] // Light gray
    },

    // High energy and chaotic
    chaotic: {
        frequency: 0.4,
        amplitude: 6.0,
        maxDistance: 4.0,
        timeSpeed: 1.5,
        noiseScale: 1.8,
        noiseDensity: 2.0,
        particleSize: 1.3,
        colorIntensity: 1.4,
        mouseInfluenceStrength: 2.0,
        noiseOctaves: 6.0,
        noiseLacunarity: 2.8,
        noiseGain: 0.8,
        turbulenceStrength: 2.0,
        flowDirection: 180.0,
        waveSpeed: 2.5,
        distortionStrength: 1.8,
        particleColor: [1.0, 0.3, 0.3] // Red
    },

    // Flowing and organic
    flowing: {
        frequency: 0.15,
        amplitude: 3.0,
        maxDistance: 3.5,
        timeSpeed: 0.4,
        noiseScale: 0.6,
        noiseDensity: 0.9,
        particleSize: 1.1,
        colorIntensity: 0.9,
        mouseInfluenceStrength: 0.8,
        noiseOctaves: 3.0,
        noiseLacunarity: 2.0,
        noiseGain: 0.5,
        turbulenceStrength: 0.8,
        flowDirection: 45.0,
        waveSpeed: 0.6,
        distortionStrength: 1.0,
        particleColor: [0.2, 1.0, 0.4] // Green
    },

    // Technical blue theme
    technical: {
        frequency: 0.25,
        amplitude: 2.5,
        maxDistance: 2.8,
        timeSpeed: 0.8,
        noiseScale: 1.2,
        noiseDensity: 1.3,
        particleSize: 0.9,
        colorIntensity: 1.3,
        mouseInfluenceStrength: 1.5,
        noiseOctaves: 4.0,
        noiseLacunarity: 2.2,
        noiseGain: 0.6,
        turbulenceStrength: 1.0,
        flowDirection: 90.0,
        waveSpeed: 1.2,
        distortionStrength: 1.1,
        particleColor: [0.2, 0.6, 1.0] // Blue
    }
};

// Quick test function to verify all parameters are working
export const validateShaderControls = (shaderProps) => {
    const requiredParams = [
        'frequency', 'amplitude', 'maxDistance', 'timeSpeed',
        'noiseScale', 'noiseDensity', 'particleSize', 'colorIntensity',
        'mouseInfluenceStrength', 'noiseOctaves', 'noiseLacunarity',
        'noiseGain', 'turbulenceStrength', 'flowDirection', 'waveSpeed',
        'distortionStrength', 'particleColor'
    ];
    
    const missing = requiredParams.filter(param => !(param in shaderProps));
    
    if (missing.length > 0) {
        console.warn('Missing shader parameters:', missing);
        return false;
    }
    
    console.log('✅ All shader parameters present:', Object.keys(shaderProps).length);
    return true;
};
