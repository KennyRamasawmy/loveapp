import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Simple PWA registration - works with Create React App
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    // For GitHub Pages, we don't need a custom service worker
    // The install prompt will still work
    console.log('PWA: Install prompt ready');
  });
}