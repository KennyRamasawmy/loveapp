import { useState, useEffect, useCallback } from 'react';
import { useAppData } from '../../hooks/useAppData';
import './EasterEgg.css';

const EasterEgg = () => {
  const { data } = useAppData();
  const [isActive, setIsActive] = useState(false);
  const [typedKeys, setTypedKeys] = useState('');
  const [clickCount, setClickCount] = useState(0);

  const triggerWord = data?.settings?.easterEggTrigger || 'iloveyou';
  const secretMessage = data?.meta?.secretMessage || 'You are my everything. Forever and always. 💖';

  // Keyboard trigger
  const handleKeyPress = useCallback((e) => {
    if (isActive) return;

    const newTyped = (typedKeys + e.key).toLowerCase().slice(-triggerWord.length);
    setTypedKeys(newTyped);

    if (newTyped === triggerWord.toLowerCase()) {
      setIsActive(true);
      setTypedKeys('');
    }
  }, [typedKeys, triggerWord, isActive]);

  useEffect(() => {
    window.addEventListener('keypress', handleKeyPress);
    return () => window.removeEventListener('keypress', handleKeyPress);
  }, [handleKeyPress]);

  // Click trigger (5 rapid clicks on logo)
  useEffect(() => {
    if (clickCount >= 5) {
      setIsActive(true);
      setClickCount(0);
    }

    const timer = setTimeout(() => setClickCount(0), 2000);
    return () => clearTimeout(timer);
  }, [clickCount]);

  const handleLogoClick = () => {
    setClickCount(prev => prev + 1);
  };

  const closeEasterEgg = () => {
    setIsActive(false);
  };

  // Expose click handler globally for navigation logo
  useEffect(() => {
    window.triggerEasterEggClick = handleLogoClick;
    return () => {
      delete window.triggerEasterEggClick;
    };
  }, []);

  if (!isActive) return null;

  return (
    <div className="easter-egg-overlay" onClick={closeEasterEgg}>
      <div className="easter-egg-content" onClick={e => e.stopPropagation()}>
        <div className="ee-hearts">
          {[...Array(20)].map((_, i) => (
            <span
              key={i}
              className="ee-heart"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${3 + Math.random() * 2}s`
              }}
            >
              {['💕', '💖', '💗', '💝', '✨', '💘'][Math.floor(Math.random() * 6)]}
            </span>
          ))}
        </div>

        <div className="ee-card">
          <div className="ee-icon">💝</div>
          <h2 className="ee-title">You Found It!</h2>
          <p className="ee-message">{secretMessage}</p>
          <div className="ee-sparkle">✨</div>
          <button className="ee-close" onClick={closeEasterEgg}>
            Close with Love 💕
          </button>
        </div>
      </div>
    </div>
  );
};

export default EasterEgg;