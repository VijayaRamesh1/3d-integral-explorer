import React, { Suspense } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './contexts/AppContext';
import Home from './pages/Home';
import GettingStarted from './pages/GettingStarted';
import WebGLCheck from './pages/WebGLCheck';

// Using HashRouter instead of BrowserRouter for GitHub Pages compatibility
function App() {
  return (
    <AppProvider>
      <Router>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/getting-started" element={<GettingStarted />} />
            <Route path="/webgl-check" element={<WebGLCheck />} />
          </Routes>
        </Suspense>
      </Router>
    </AppProvider>
  );
}

export default App;