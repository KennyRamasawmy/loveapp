import { useState, useEffect } from 'react';
import './InstallPrompt.css';

const InstallPrompt = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    // Check if already installed
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true);
      return;
    }

    // Check if iOS
    const isIOSDevice = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    setIsIOS(isIOSDevice);

    // Listen for install prompt (Android/Desktop)
    const handleBeforeInstall = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      
      // Check if user dismissed before
      const dismissed = localStorage.getItem('pwa-install-dismissed');
      if (!dismissed) {
        setTimeout(() => setShowPrompt(true), 3000);
      }
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstall);

    // Show iOS prompt after delay
    if (isIOSDevice) {
      const dismissed = localStorage.getItem('pwa-install-dismissed');
      if (!dismissed) {
        setTimeout(() => setShowPrompt(true), 3000);
      }
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
    };
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    
    if (outcome === 'accepted') {
      setShowPrompt(false);
    }
    setDeferredPrompt(null);
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    localStorage.setItem('pwa-install-dismissed', 'true');
  };

  const handleRemindLater = () => {
    setShowPrompt(false);
    // Will show again on next visit
  };

  if (isInstalled || !showPrompt) return null;

  return (
    <div className="install-prompt-overlay">
      <div className="install-prompt">
        <button className="install-close" onClick={handleDismiss}>×</button>
        
        <div className="install-icon">💕</div>
        <h3 className="install-title">Install Our Love App</h3>
        <p className="install-description">
          Add this app to your home screen for quick access to our memories!
        </p>

        {isIOS ? (
          <div className="install-ios-instructions">
            <p>To install on iPhone/iPad:</p>
            <ol>
              <li>Tap the <strong>Share</strong> button <span className="ios-icon">⬆️</span></li>
              <li>Scroll and tap <strong>"Add to Home Screen"</strong></li>
              <li>Tap <strong>"Add"</strong></li>
            </ol>
            <button className="install-btn secondary" onClick={handleDismiss}>
              Got it!
            </button>
          </div>
        ) : (
          <div className="install-buttons">
            <button className="install-btn primary" onClick={handleInstall}>
              Install App 📲
            </button>
            <button className="install-btn secondary" onClick={handleRemindLater}>
              Maybe Later
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default InstallPrompt;