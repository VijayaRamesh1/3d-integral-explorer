import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppContext } from '../contexts/AppContext';
import { commonStyles } from '../styles/theme';

const WebGLCheck = () => {
  const { highContrastMode } = useAppContext();
  const [webGLInfo, setWebGLInfo] = useState({
    supported: false,
    renderer: '',
    vendor: '',
    version: '',
    shadingLanguageVersion: '',
    extensions: [],
    maxTextureSize: 0,
    checkingComplete: false,
    error: null
  });

  useEffect(() => {
    // Check WebGL support
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      
      if (!gl) {
        setWebGLInfo({
          supported: false,
          checkingComplete: true,
          error: 'WebGL is not supported in your browser'
        });
        return;
      }
      
      const extensions = [];
      const extensionNames = gl.getSupportedExtensions();
      if (extensionNames) {
        extensionNames.slice(0, 10).forEach(ext => {
          extensions.push(ext);
        });
      }
      
      setWebGLInfo({
        supported: true,
        renderer: gl.getParameter(gl.RENDERER),
        vendor: gl.getParameter(gl.VENDOR),
        version: gl.getParameter(gl.VERSION),
        shadingLanguageVersion: gl.getParameter(gl.SHADING_LANGUAGE_VERSION),
        extensions: extensions,
        maxTextureSize: gl.getParameter(gl.MAX_TEXTURE_SIZE),
        checkingComplete: true,
        error: null
      });
    } catch (e) {
      setWebGLInfo({
        supported: false,
        checkingComplete: true,
        error: e.message
      });
    }
  }, []);
  
  const pageStyle = {
    padding: '40px',
    maxWidth: '800px',
    margin: '0 auto',
    backgroundColor: commonStyles.getColor('background', highContrastMode),
    color: commonStyles.getColor('text', highContrastMode),
    minHeight: '100vh'
  };
  
  const headingStyle = {
    color: commonStyles.getColor('primary', highContrastMode),
    marginBottom: '20px'
  };
  
  const sectionStyle = {
    marginBottom: '30px',
    padding: '20px',
    backgroundColor: commonStyles.getColor('secondary', highContrastMode),
    borderRadius: '8px'
  };
  
  const linkStyle = {
    color: commonStyles.getColor('primary', highContrastMode),
    textDecoration: 'none',
    fontWeight: 'bold',
    padding: '10px 20px',
    backgroundColor: commonStyles.getColor('highlight', highContrastMode),
    borderRadius: '4px',
    display: 'inline-block',
    marginTop: '20px'
  };
  
  return (
    <div style={pageStyle}>
      <h1 style={headingStyle}>WebGL Compatibility Check</h1>
      
      <section style={sectionStyle}>
        <h2 style={headingStyle}>Checking WebGL Support</h2>
        
        {!webGLInfo.checkingComplete ? (
          <p>Testing your browser's WebGL capabilities...</p>
        ) : webGLInfo.supported ? (
          <div>
            <p style={{ 
              color: commonStyles.getColor('primary', highContrastMode),
              fontWeight: 'bold',
              fontSize: '18px'
            }}>
              ✓ WebGL is supported in your browser!
            </p>
            
            <h3 style={{ marginTop: '20px', color: commonStyles.getColor('primary', highContrastMode) }}>
              WebGL Information
            </h3>
            <ul style={{ paddingLeft: '25px' }}>
              <li><strong>Renderer:</strong> {webGLInfo.renderer || 'Unknown'}</li>
              <li><strong>Vendor:</strong> {webGLInfo.vendor || 'Unknown'}</li>
              <li><strong>Version:</strong> {webGLInfo.version || 'Unknown'}</li>
              <li><strong>Shading Language:</strong> {webGLInfo.shadingLanguageVersion || 'Unknown'}</li>
              <li><strong>Max Texture Size:</strong> {webGLInfo.maxTextureSize}px</li>
            </ul>
            
            <p style={{ marginTop: '20px' }}>
              Your browser should be able to run the 3D Integral Explorer without issues.
            </p>
          </div>
        ) : (
          <div>
            <p style={{ 
              color: '#FF6666',
              fontWeight: 'bold',
              fontSize: '18px'
            }}>
              ✗ WebGL is not supported in your browser.
            </p>
            
            <p style={{ marginTop: '20px' }}>
              Error: {webGLInfo.error || 'Unknown error'}
            </p>
            
            <h3 style={{ marginTop: '20px', color: commonStyles.getColor('primary', highContrastMode) }}>
              Recommended Solutions
            </h3>
            <ul style={{ paddingLeft: '25px' }}>
              <li>Update your browser to the latest version</li>
              <li>Try a different browser (Chrome, Firefox, or Edge)</li>
              <li>Check if hardware acceleration is enabled in your browser settings</li>
              <li>Update your graphics drivers</li>
              <li>If using a mobile device, try a desktop computer instead</li>
            </ul>
          </div>
        )}
      </section>
      
      <Link to="/" style={linkStyle}>
        Return to Explorer
      </Link>
    </div>
  );
};

export default WebGLCheck;