import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useWebGLManager } from '../WebGL/UniversalWebGLManager';

/**
 * Navigation Stress Test - Tests WebGL context management during navigation
 * Automatically cycles through pages to test context cleanup and recovery
 */
export default function NavigationStressTest() {
    const { manager, status } = useWebGLManager();
    const navigate = useNavigate();
    const location = useLocation();
    const [isActive, setIsActive] = useState(false);
    const [currentPage, setCurrentPage] = useState(0);
    const [testResults, setTestResults] = useState([]);
    const [isVisible, setIsVisible] = useState(false);

    const testPages = [
        { path: '/', name: 'Home' },
        { path: '/products/monitoring', name: 'Monitoring' },
        { path: '/products/data-manager', name: 'Data Manager' },
        { path: '/products/PILA', name: 'PILA' },
        { path: '/plugins', name: 'Plugins' },
    ];

    useEffect(() => {
        let interval;
        if (isActive) {
            interval = setInterval(() => {
                const nextPage = (currentPage + 1) % testPages.length;
                const page = testPages[nextPage];
                
                // Record test result
                const managerStatus = manager?.getGlobalStatus?.();
                const result = {
                    timestamp: Date.now(),
                    fromPage: location.pathname,
                    toPage: page.path,
                    contexts: managerStatus?.totalContexts || 0,
                    resources: managerStatus?.totalResources || 0,
                    contextLosses: managerStatus?.performanceMetrics?.contextLosses || 0,
                    recoveries: managerStatus?.performanceMetrics?.recoveries || 0
                };
                
                setTestResults(prev => [...prev.slice(-9), result]);
                
                navigate(page.path);
                setCurrentPage(nextPage);
            }, 5000); // Navigate every 5 seconds
        }

        return () => {
            if (interval) clearInterval(interval);
        };
    }, [isActive, currentPage, navigate, location.pathname, manager]);

    // Toggle visibility with keyboard shortcut
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'F10' && e.ctrlKey) {
                e.preventDefault();
                setIsVisible(!isVisible);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isVisible]);

    const startTest = () => {
        setIsActive(true);
        setTestResults([]);
        setCurrentPage(0);
    };

    const stopTest = () => {
        setIsActive(false);
    };

    const clearResults = () => {
        setTestResults([]);
    };

    if (!isVisible) {
        return (
            <div 
                style={{
                    position: 'fixed',
                    bottom: 10,
                    left: 10,
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
                🧪 Navigation Test (Ctrl+F10)
            </div>
        );
    }

    return (
        <div style={{
            position: 'fixed',
            bottom: 10,
            left: 10,
            background: 'rgba(0, 0, 0, 0.95)',
            color: 'white',
            padding: '15px',
            borderRadius: '8px',
            fontSize: '11px',
            zIndex: 10000,
            maxWidth: '400px',
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
                <strong>🧪 Navigation Stress Test</strong>
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

            <div style={{ marginBottom: '15px' }}>
                <div style={{ marginBottom: '10px' }}>
                    <strong>Status:</strong> {isActive ? '🔄 Running' : '⏸️ Stopped'}
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <strong>Current Page:</strong> {location.pathname}
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <strong>Test Results:</strong> {testResults.length} recorded
                </div>
            </div>

            <div style={{ marginBottom: '15px' }}>
                <button 
                    onClick={isActive ? stopTest : startTest}
                    style={{
                        padding: '8px 16px',
                        background: isActive ? '#ff6b6b' : '#4ecdc4',
                        color: '#000',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontSize: '12px',
                        fontWeight: 'bold',
                        marginRight: '10px'
                    }}
                >
                    {isActive ? 'Stop Test' : 'Start Test'}
                </button>
                <button 
                    onClick={clearResults}
                    style={{
                        padding: '8px 16px',
                        background: '#ffaa00',
                        color: '#000',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontSize: '12px',
                        fontWeight: 'bold'
                    }}
                >
                    Clear Results
                </button>
            </div>

            {testResults.length > 0 && (
                <div style={{ marginBottom: '15px' }}>
                    <div style={{ color: '#4ecdc4', fontWeight: 'bold', marginBottom: '5px' }}>Test Results:</div>
                    <div style={{ maxHeight: '200px', overflow: 'auto' }}>
                        {testResults.map((result, index) => (
                            <div 
                                key={index} 
                                style={{ 
                                    marginBottom: '5px',
                                    padding: '5px',
                                    background: 'rgba(255, 255, 255, 0.1)',
                                    borderRadius: '3px',
                                    fontSize: '10px'
                                }}
                            >
                                <div>
                                    <strong>{new Date(result.timestamp).toLocaleTimeString()}</strong>
                                </div>
                                <div>
                                    {result.fromPage} → {result.toPage}
                                </div>
                                <div>
                                    Contexts: {result.contexts}, Resources: {result.resources}
                                </div>
                                <div>
                                    Losses: {result.contextLosses}, Recoveries: {result.recoveries}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <div style={{ fontSize: '10px', color: '#aaa' }}>
                Press Ctrl+F10 to toggle | Test cycles every 5 seconds
            </div>
        </div>
    );
}
