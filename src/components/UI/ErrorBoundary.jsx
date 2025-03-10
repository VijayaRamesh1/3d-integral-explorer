import React, { Component } from 'react';
import { commonStyles } from '../../styles/theme';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error in 3D visualization:', error, errorInfo);
    // You could send this error to an error reporting service
  }

  render() {
    const { highContrastMode } = this.props;
    
    if (this.state.hasError) {
      return (
        <div style={commonStyles.loadingStyle(highContrastMode)}>
          <h2 style={{ color: commonStyles.getColor('accent', highContrastMode) }}>
            3D Rendering Error
          </h2>
          <p>Sorry, something went wrong with the 3D visualization.</p>
          <p>This may be due to WebGL compatibility issues with your browser or device.</p>
          <div style={{ marginTop: '20px' }}>
            <a 
              href="/webgl-check.html" 
              style={{ color: commonStyles.getColor('primary', highContrastMode), textDecoration: 'underline' }}
            >
              Check WebGL Support
            </a>
          </div>
          <button
            onClick={() => this.setState({ hasError: false, error: null })}
            style={{
              ...commonStyles.buttonStyle(highContrastMode),
              marginTop: '20px'
            }}
          >
            Try Again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;