import { useState, useEffect } from 'react';
import { useAppData } from '../../hooks/useAppData';
import { Card } from '../UI';
import './Home.css';

const Home = () => {
  const { data, loading } = useAppData();
  const [stats, setStats] = useState({
    days: 0,
    months: 0,
    years: 0,
    nextAnniversary: 0
  });
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (data?.meta?.startDate) {
      calculateStats(data.meta.startDate);
    }
    setTimeout(() => setVisible(true), 100);
  }, [data]);

  const calculateStats = (startDateStr) => {
    const start = new Date(startDateStr);
    const now = new Date();
    
    // Days together
    const diffTime = Math.abs(now - start);
    const days = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    // Months together
    const months = Math.floor(days / 30.44);
    
    // Years together
    const years = Math.floor(days / 365.25);
    
    // Next anniversary
    const nextAnniversary = new Date(start);
    nextAnniversary.setFullYear(now.getFullYear());
    if (nextAnniversary < now) {
      nextAnniversary.setFullYear(now.getFullYear() + 1);
    }
    const daysUntilAnniversary = Math.ceil((nextAnniversary - now) / (1000 * 60 * 60 * 24));

    setStats({
      days,
      months,
      years,
      nextAnniversary: daysUntilAnniversary
    });
  };

  if (loading) {
    return (
      <div className="home-loading">
        <span className="loading-heart">💕</span>
        <p>Loading our story...</p>
      </div>
    );
  }

  const { meta } = data || {};

  return (
    <div className="home">
      <div className={`home-hero ${visible ? 'visible' : ''}`}>
        <div className="hero-decoration">
          <span className="deco-heart deco-1">💕</span>
          <span className="deco-heart deco-2">✨</span>
          <span className="deco-heart deco-3">💗</span>
        </div>

        <div className="hero-content">
          <span className="hero-icon">💖</span>
          <h1 className="hero-title">
            {meta?.names?.him || 'Him'} & {meta?.names?.her || 'Her'}
          </h1>
          <p className="hero-subtitle">{meta?.welcomeMessage || 'Our love story'}</p>
          
          <div className="hero-date">
            <span className="date-label">Together since</span>
            <span className="date-value">
              {meta?.startDate ? new Date(meta.startDate).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              }) : 'Forever'}
            </span>
          </div>
        </div>
      </div>

      <div className={`home-stats ${visible ? 'visible' : ''}`}>
        <Card className="stat-card" hover>
          <span className="stat-icon">📆</span>
          <span className="stat-value">{stats.days.toLocaleString()}</span>
          <span className="stat-label">Days Together</span>
        </Card>

        <Card className="stat-card" hover>
          <span className="stat-icon">🌙</span>
          <span className="stat-value">{stats.months}</span>
          <span className="stat-label">Months Together</span>
        </Card>

        <Card className="stat-card" hover>
          <span className="stat-icon">💫</span>
          <span className="stat-value">{stats.years}</span>
          <span className="stat-label">Years Together</span>
        </Card>

        <Card className="stat-card anniversary" hover>
          <span className="stat-icon">🎂</span>
          <span className="stat-value">{stats.nextAnniversary}</span>
          <span className="stat-label">Days to Anniversary</span>
        </Card>
      </div>

      <div className={`home-message ${visible ? 'visible' : ''}`}>
        <Card className="message-card">
          <span className="message-icon">💌</span>
          <p className="message-text">
            Every moment with you is a treasure. This little app is a celebration of us, 
            our memories, and all the beautiful days ahead.
          </p>
          <span className="message-signature">~ With all my love ~</span>
        </Card>
      </div>
    </div>
  );
};

export default Home;