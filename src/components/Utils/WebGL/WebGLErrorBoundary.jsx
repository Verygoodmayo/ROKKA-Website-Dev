import React from 'react';

class WebGLErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // Log the error for debugging
    console.error('WebGL Error caught by boundary:', error, errorInfo);
    
    // Check if it's a WebGL-related error
    if (error.message && (
      error.message.includes('WebGL') ||
      error.message.includes('addEventListener') ||
      error.message.includes('Context Lost') ||
      error.message.includes('canvas')
    )) {
      console.warn('WebGL context error detected. This might be due to hardware limitations or browser issues.');
    }
  }

  render() {
    if (this.state.hasError) {
      // Render fallback UI
      return (
        <div className="webgl-error-fallback" style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          background: 'rgba(0, 0, 0, 0.1)',
          color: '#666',
          fontSize: '14px',
          textAlign: 'center',
          padding: '20px'
        }}>
          <div>
            <p>3D content temporarily unavailable</p>
            <button 
              onClick={() => this.setState({ hasError: false, error: null })}
              style={{
                padding: '8px 16px',
                background: '#007bff',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                marginTop: '10px'
              }}
            >
              Try Again
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default WebGLErrorBoundary;
