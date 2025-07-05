import { useState, useEffect } from 'react';
import contextManager from './WebGLContextManager';

/**
 * WebGL Debug Panel - Shows real-time WebGL context status
 * Only appears in development mode
 */
export default function WebGLDebugPanel() {
  const [stats, setStats] = useState(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Only show in development
    if (process.env.NODE_ENV !== 'development') return;

    const interval = setInterval(() => {
      const currentStats = contextManager.getStats();
      setStats(currentStats);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  if (process.env.NODE_ENV !== 'development' || !stats) return null;

  return (
    <div style={{
      position: 'fixed',
      top: '10px',
      right: '10px',
      zIndex: 10000,
      background: visible ? 'rgba(0, 0, 0, 0.9)' : 'rgba(0, 0, 0, 0.7)',
      color: 'white',
      padding: '10px',
      borderRadius: '5px',
      fontSize: '12px',
      fontFamily: 'monospace',
      minWidth: '200px',
      maxWidth: '300px',
      cursor: 'pointer'
    }} onClick={() => setVisible(!visible)}>
      <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>
        🖥️ WebGL Status {visible ? '▼' : '▶'}
      </div>
      
      {visible && (
        <>
          <div style={{ marginBottom: '5px' }}>
            <strong>Contexts:</strong> {stats.activeContexts}/{stats.maxContexts}
          </div>
          <div style={{ marginBottom: '5px' }}>
            <strong>Resources:</strong> {stats.totalResources}
          </div>
          <div style={{ marginBottom: '5px' }}>
            <strong>Status:</strong> {stats.isContextLost ? '❌ Lost' : '✅ Active'}
          </div>
          
          {stats.contexts.length > 0 && (
            <div style={{ marginTop: '10px' }}>
              <strong>Active Contexts:</strong>
              <div style={{ marginLeft: '10px', fontSize: '11px' }}>
                {stats.contexts.map(ctx => (
                  <div key={ctx}>• {ctx}</div>
                ))}
              </div>
            </div>
          )}
          
          <div style={{ 
            marginTop: '10px', 
            padding: '5px', 
            background: 'rgba(255, 255, 255, 0.1)',
            borderRadius: '3px',
            fontSize: '10px'
          }}>
            Click to toggle • Updates every 1s
          </div>
        </>
      )}
    </div>
  );
}
