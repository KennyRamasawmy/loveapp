import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Input, Button } from '../UI';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showContent, setShowContent] = useState(false);
  
  const { login } = useAuth();

  // Trigger entrance animation
  useState(() => {
    setTimeout(() => setShowContent(true), 100);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(email, password);
    } catch (err) {
      setError('Invalid credentials. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-background">
        <div className="floating-heart heart-1">💕</div>
        <div className="floating-heart heart-2">💗</div>
        <div className="floating-heart heart-3">💖</div>
        <div className="floating-heart heart-4">✨</div>
        <div className="floating-heart heart-5">💕</div>
      </div>

      <div className={`login-card ${showContent ? 'visible' : ''}`}>
        <div className="login-header">
          <div className="login-icon">💝</div>
          <h1 className="login-title">Our Love Story</h1>
          <p className="login-subtitle">Enter our private world</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <Input
            type="email"
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            icon="✉️"
          />

          <Input
            type="password"
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            icon="🔒"
          />

          {error && (
            <div className="login-error animate-fade-in">
              {error}
            </div>
          )}

          <Button 
            type="submit" 
            fullWidth 
            disabled={loading}
            size="lg"
          >
            {loading ? (
              <span className="loading-text">
                <span className="dot">.</span>
                <span className="dot">.</span>
                <span className="dot">.</span>
              </span>
            ) : (
              <>Enter <span>💕</span></>
            )}
          </Button>
        </form>

        <div className="login-footer">
          <span>Made with love</span>
          <span className="animate-heart-beat">❤️</span>
        </div>
      </div>
    </div>
  );
};

export default Login;