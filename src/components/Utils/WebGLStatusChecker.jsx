import React, { useState, useEffect } from 'react';
import { useWebGLManager } from './UniversalWebGLManager';

/**
 * WebGL Status Checker - A comprehensive diagnostic tool for WebGL contexts
 * Shows real-time status of all WebGL contexts and resources
 */
export default function WebGLStatusChecker() {
    const { manager, status } = useWebGLManager();
    const [isVisible, setIsVisible] = useState(false);
    const [webglInfo, setWebglInfo] = useState({});
    const [systemInfo, setSystemInfo] = useState({});

    // Get WebGL capabilities
    useEffect(() => {
        const getWebGLInfo = () => {
            const canvas = document.createElement('canvas');
            const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
            
            if (!gl) {
                return { error: 'WebGL not supported' };
            }

            const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
            const info = {
                version: gl.getParameter(gl.VERSION),
                vendor: gl.getParameter(gl.VENDOR),
                renderer: gl.getParameter(gl.RENDERER),
                shadingLanguageVersion: gl.getParameter(gl.SHADING_LANGUAGE_VERSION),
                maxTextureSize: gl.getParameter(gl.MAX_TEXTURE_SIZE),
                maxVertexAttribs: gl.getParameter(gl.MAX_VERTEX_ATTRIBS),
                maxVertexUniformVectors: gl.getParameter(gl.MAX_VERTEX_UNIFORM_VECTORS),
                maxFragmentUniformVectors: gl.getParameter(gl.MAX_FRAGMENT_UNIFORM_VECTORS),
                maxRenderBufferSize: gl.getParameter(gl.MAX_RENDERBUFFER_SIZE),
                maxViewportDims: gl.getParameter(gl.MAX_VIEWPORT_DIMS),
                maxCombinedTextureImageUnits: gl.getParameter(gl.MAX_COMBINED_TEXTURE_IMAGE_UNITS),
                unmaskedRenderer: debugInfo ? gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL) : 'N/A',
                unmaskedVendor: debugInfo ? gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL) : 'N/A',
                extensions: gl.getSupportedExtensions()
            };

            return info;
        };

        const getSystemInfo = () => {
            return {
                userAgent: navigator.userAgent,
                platform: navigator.platform,
                hardwareConcurrency: navigator.hardwareConcurrency,
                deviceMemory: navigator.deviceMemory || 'N/A',
                pixelRatio: window.devicePixelRatio,
                screenResolution: `${screen.width}x${screen.height}`,
                windowSize: `${window.innerWidth}x${window.innerHeight}`,
                colorDepth: screen.colorDepth,
                timestamp: new Date().toISOString()
            };
        };

        setWebglInfo(getWebGLInfo());
        setSystemInfo(getSystemInfo());
    }, []);

    // Toggle visibility with keyboard shortcut
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'F11' && e.ctrlKey) {
                e.preventDefault();
                setIsVisible(!isVisible);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isVisible]);

    if (!isVisible) {
        return (
            <div 
                style={{
                    position: 'fixed',
                    bottom: 10,
                    right: 10,
                    background: 'rgba(0, 0, 0, 0.8)',
                    color: 'white',
                    padding: '5px 10px',
                    borderRadius: '5px',
                    fontSize: '12px',
                    zIndex: 10000,
                    cursor: 'pointer',
                    userSelect: 'none'
                }}
                onClick={() => setIsVisible(true)}
            >
                🔍 WebGL Status (Ctrl+F11)
            </div>
        );
    }

    return (
        <div style={{
            position: 'fixed',
            bottom: 10,
            right: 10,
            background: 'rgba(0, 0, 0, 0.95)',
            color: 'white',
            padding: '15px',
            borderRadius: '8px',
            fontSize: '11px',
            zIndex: 10000,
            maxWidth: '500px',
            maxHeight: '80vh',
            overflow: 'auto',
            fontFamily: 'monospace'
        }}>
            <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                marginBottom: '10px'
            }}>
                <strong>🔍 WebGL Status Checker</strong>
                <button 
                    onClick={() => setIsVisible(false)}
                    style={{
                        background: 'none',
                        border: 'none',
                        color: 'white',
                        cursor: 'pointer',
                        fontSize: '16px'
                    }}
                >
                    ×
                </button>
            </div>

            {/* Manager Status */}
            <div style={{ marginBottom: '15px' }}>
                <div style={{ color: '#4ecdc4', fontWeight: 'bold' }}>Manager Status:</div>
                <div style={{ paddingLeft: '10px' }}>
                    <div>Connected: {status ? '✅' : '❌'}</div>
                    <div>Contexts: {manager?.getGlobalStatus?.()?.totalContexts || 0}</div>
                    <div>Resources: {manager?.getGlobalStatus?.()?.totalResources || 0}</div>
                </div>
            </div>

            {/* WebGL Information */}
            <div style={{ marginBottom: '15px' }}>
                <div style={{ color: '#4ecdc4', fontWeight: 'bold' }}>WebGL Information:</div>
                <div style={{ paddingLeft: '10px' }}>
                    {webglInfo.error ? (
                        <div style={{ color: '#ff6b6b' }}>{webglInfo.error}</div>
                    ) : (
                        <>
                            <div>Version: {webglInfo.version}</div>
                            <div>Vendor: {webglInfo.vendor}</div>
                            <div>Renderer: {webglInfo.renderer}</div>
                            <div>Shading Language: {webglInfo.shadingLanguageVersion}</div>
                            <div>Max Texture Size: {webglInfo.maxTextureSize}</div>
                            <div>Max Vertex Attribs: {webglInfo.maxVertexAttribs}</div>
                            <div>Max Viewport: {webglInfo.maxViewportDims?.join?.('x') || 'N/A'}</div>
                            <div>Unmasked Renderer: {webglInfo.unmaskedRenderer}</div>
                            <div>Extensions: {webglInfo.extensions?.length || 0} supported</div>
                        </>
                    )}
                </div>
            </div>

            {/* System Information */}
            <div style={{ marginBottom: '15px' }}>
                <div style={{ color: '#4ecdc4', fontWeight: 'bold' }}>System Information:</div>
                <div style={{ paddingLeft: '10px' }}>
                    <div>Platform: {systemInfo.platform}</div>
                    <div>Pixel Ratio: {systemInfo.pixelRatio}</div>
                    <div>Screen: {systemInfo.screenResolution}</div>
                    <div>Window: {systemInfo.windowSize}</div>
                    <div>Color Depth: {systemInfo.colorDepth}</div>
                    <div>CPU Cores: {systemInfo.hardwareConcurrency}</div>
                    <div>Device Memory: {systemInfo.deviceMemory}GB</div>
                </div>
            </div>

            {/* Performance Metrics */}
            {manager?.getGlobalStatus?.()?.performanceMetrics && (
                <div style={{ marginBottom: '15px' }}>
                    <div style={{ color: '#4ecdc4', fontWeight: 'bold' }}>Performance Metrics:</div>
                    <div style={{ paddingLeft: '10px' }}>
                        <div>Context Losses: {manager.getGlobalStatus().performanceMetrics.contextLosses}</div>
                        <div>Recoveries: {manager.getGlobalStatus().performanceMetrics.recoveries}</div>
                        <div>Total Resources: {manager.getGlobalStatus().performanceMetrics.totalResources}</div>
                    </div>
                </div>
            )}

            {/* Active Contexts */}
            {manager?.getGlobalStatus?.()?.contexts && (
                <div style={{ marginBottom: '15px' }}>
                    <div style={{ color: '#4ecdc4', fontWeight: 'bold' }}>Active Contexts:</div>
                    <div style={{ paddingLeft: '10px' }}>
                        {manager.getGlobalStatus().contexts.map(ctx => (
                            <div key={ctx.id} style={{ 
                                color: ctx.isContextLost ? '#ff6b6b' : '#4ecdc4',
                                marginBottom: '3px'
                            }}>
                                {ctx.id} - {ctx.resourceCount} resources
                                {ctx.isContextLost && ' (LOST)'}
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <div style={{ fontSize: '10px', color: '#aaa' }}>
                Press Ctrl+F11 to toggle | Updated: {systemInfo.timestamp}
            </div>
        </div>
    );
}
