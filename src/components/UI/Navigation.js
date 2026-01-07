import { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import './Navigation.css';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isAdmin, logout } = useAuth();
  const { isDarkMode, toggleDarkMode } = useTheme();
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Home', icon: '🏠' },
    { path: '/gallery', label: 'Gallery', icon: '📷' },
    { path: '/quote', label: 'Quote', icon: '💌' },
    { path: '/calendar', label: 'Calendar', icon: '📅' },
    { path: '/timeline', label: 'Timeline', icon: '💫' },
    { path: '/bucket-list', label: 'Bucket List', icon: '🎯' },
    { path: '/stats', label: 'Stats', icon: '📊' },
  ];

  if (isAdmin) {
    navItems.push({ path: '/admin', label: 'Admin', icon: '⚙️' });
  }

  const handleNavClick = () => {
    setIsOpen(false);
  };

  return (
    <>
      <nav className="navigation">
        <div className="nav-brand" onClick={() => window.triggerEasterEggClick?.()}>
          <span className="nav-logo">💕</span>
          <span className="nav-title">Our Story</span>
        </div>

        <div className="nav-right">
          {/* Dark Mode Toggle */}
          <button 
            className="dark-mode-toggle"
            onClick={toggleDarkMode}
            title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {isDarkMode ? '☀️' : '🌙'}
          </button>

          <button 
            className={`nav-toggle ${isOpen ? 'active' : ''}`}
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>

        <div className={`nav-menu ${isOpen ? 'open' : ''}`}>
          <ul className="nav-list">
            {navItems.map((item, index) => (
              <li key={item.path} style={{ animationDelay: `${index * 0.05}s` }}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) => 
                    `nav-link ${isActive ? 'active' : ''}`
                  }
                  onClick={handleNavClick}
                >
                  <span className="nav-icon">{item.icon}</span>
                  <span className="nav-label">{item.label}</span>
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="nav-footer">
            {/* Dark Mode Toggle in Menu (Mobile) */}
            <button 
              className="nav-dark-mode"
              onClick={toggleDarkMode}
            >
              <span>{isDarkMode ? '☀️' : '🌙'}</span>
              <span>{isDarkMode ? 'Light Mode' : 'Dark Mode'}</span>
            </button>

            <button className="nav-logout" onClick={logout}>
              <span>👋</span>
              <span>Logout</span>
            </button>
          </div>
        </div>
      </nav>

      {isOpen && <div className="nav-overlay" onClick={() => setIsOpen(false)} />}
    </>
  );
};

export default Navigation;