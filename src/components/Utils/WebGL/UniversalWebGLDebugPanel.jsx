import React, { useEffect, useState } from 'react';
import { useWebGLManager } from './UniversalWebGLManager';

export default function UniversalWebGLDebugPanel() {
    const { manager, status } = useWebGLManager();
    const [isVisible, setIsVisible] = useState(false);
    const [detailedStatus, setDetailedStatus] = useState({});

    useEffect(() => {
        // Update detailed status every 2 seconds
        const interval = setInterval(() => {
            if (manager) {
                setDetailedStatus(manager.getGlobalStatus());
            }
        }, 2000);

        return () => clearInterval(interval);
    }, [manager]);

    // Show/hide with keyboard shortcut
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'F12' && e.ctrlKey) {
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
                    top: 10,
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
                🔧 WebGL Debug (Ctrl+F12)
            </div>
        );
    }

    return (
        <div style={{
            position: 'fixed',
            top: 10,
            right: 10,
            background: 'rgba(0, 0, 0, 0.9)',
            color: 'white',
            padding: '15px',
            borderRadius: '8px',
            fontSize: '12px',
            zIndex: 10000,
            maxWidth: '400px',
            fontFamily: 'monospace'
        }}>
            <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                marginBottom: '10px'
            }}>
                <strong>🔧 Universal WebGL Manager</strong>
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
            
            <div style={{ marginBottom: '10px' }}>
                <div><strong>Status:</strong> {status ? 'Connected' : 'Disconnected'}</div>
                <div><strong>Total Contexts:</strong> {detailedStatus.totalContexts || 0}</div>
                <div><strong>Total Resources:</strong> {detailedStatus.totalResources || 0}</div>
                <div><strong>Context Losses:</strong> {detailedStatus.performanceMetrics?.contextLosses || 0}</div>
                <div><strong>Recoveries:</strong> {detailedStatus.performanceMetrics?.recoveries || 0}</div>
            </div>

            <div style={{ marginBottom: '10px' }}>
                <strong>Active Contexts:</strong>
                {detailedStatus.contexts?.length > 0 ? (
                    <ul style={{ margin: '5px 0', paddingLeft: '20px' }}>
                        {detailedStatus.contexts.map(ctx => (
                            <li key={ctx.id} style={{ 
                                color: ctx.isContextLost ? '#ff6b6b' : '#4ecdc4',
                                marginBottom: '3px'
                            }}>
                                {ctx.id} - {ctx.resourceCount} resources
                                {ctx.isContextLost && ' (LOST)'}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <div style={{ color: '#ffaa00', marginLeft: '10px' }}>No contexts registered</div>
                )}
            </div>

            <div style={{ fontSize: '11px', color: '#aaa' }}>
                Press Ctrl+F12 to toggle this panel
            </div>
        </div>
    );
}
