import { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children, accentColor }) => {
  const [color, setColor] = useState(accentColor || '#e8a4b8');

  useEffect(() => {
    if (accentColor) {
      setColor(accentColor);
    }
  }, [accentColor]);

  useEffect(() => {
    // Generate color variations
    const root = document.documentElement;
    
    // Convert hex to HSL for easier manipulation
    const hexToHSL = (hex) => {
      let r = parseInt(hex.slice(1, 3), 16) / 255;
      let g = parseInt(hex.slice(3, 5), 16) / 255;
      let b = parseInt(hex.slice(5, 7), 16) / 255;

      const max = Math.max(r, g, b);
      const min = Math.min(r, g, b);
      let h, s, l = (max + min) / 2;

      if (max === min) {
        h = s = 0;
      } else {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
          case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
          case g: h = ((b - r) / d + 2) / 6; break;
          case b: h = ((r - g) / d + 4) / 6; break;
          default: h = 0;
        }
      }

      return { h: h * 360, s: s * 100, l: l * 100 };
    };

    const hsl = hexToHSL(color);
    
    // Set CSS variables
    root.style.setProperty('--color-primary', color);
    root.style.setProperty('--color-primary-soft', `hsl(${hsl.h}, ${hsl.s}%, ${Math.min(hsl.l + 20, 95)}%)`);
    root.style.setProperty('--color-primary-dark', `hsl(${hsl.h}, ${hsl.s}%, ${Math.max(hsl.l - 15, 20)}%)`);
    root.style.setProperty('--color-shadow', `${color}26`);
    
  }, [color]);

  const value = {
    accentColor: color,
    setAccentColor: setColor
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};