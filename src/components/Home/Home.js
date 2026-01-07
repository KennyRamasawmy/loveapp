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
    totalMonths: 0,
    remainingMonths: 0,
    remainingDays: 0,
    nextAnniversary: 0,
    isMonthlyAnniversary: false,
    isYearlyAnniversary: false
  });
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (data?.meta?.startDate) {
      calculateStats(data.meta.startDate);
    }
    setTimeout(() => setVisible(true), 100);
  }, [data]);

  const calculateStats = (startDateStr) => {
    const [year, month, day] = startDateStr.split('-').map(Number);
    const start = new Date(year, month - 1, day);
    const now = new Date();
    
    // Total days together
    const diffTime = Math.abs(now - start);
    const days = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    // Calculate years and months precisely
    let years = now.getFullYear() - start.getFullYear();
    let months = now.getMonth() - start.getMonth();
    let remainingDays = now.getDate() - start.getDate();

    // Adjust for negative days
    if (remainingDays < 0) {
      months--;
      const lastMonth = new Date(now.getFullYear(), now.getMonth(), 0);
      remainingDays += lastMonth.getDate();
    }

    // Adjust for negative months
    if (months < 0) {
      years--;
      months += 12;
    }

    // Total months
    const totalMonths = years * 12 + months;
    
    // Next anniversary calculation
    const nextAnniversary = new Date(start);
    nextAnniversary.setFullYear(now.getFullYear());
    if (nextAnniversary <= now) {
      nextAnniversary.setFullYear(now.getFullYear() + 1);
    }
    const daysUntilAnniversary = Math.ceil((nextAnniversary - now) / (1000 * 60 * 60 * 24));

    // Check if today is a special day
    const todayDay = now.getDate();
    const startDay = start.getDate();
    const isMonthlyAnniversary = todayDay === startDay;
    const isYearlyAnniversary = isMonthlyAnniversary && now.getMonth() === start.getMonth();

    setStats({
      days,
      years,
      months,
      totalMonths,
      remainingMonths: months,
      remainingDays,
      nextAnniversary: daysUntilAnniversary,
      isMonthlyAnniversary,
      isYearlyAnniversary
    });
  };

  // Build the "X years Y months" string
  const getTimeTogether = () => {
    const { years, remainingMonths } = stats;
    
    if (years > 0 && remainingMonths > 0) {
      return `${years}y ${remainingMonths}m`;
    } else if (years > 0) {
      return `${years} Year${years > 1 ? 's' : ''}`;
    } else if (remainingMonths > 0) {
      return `${remainingMonths} Month${remainingMonths > 1 ? 's' : ''}`;
    }
    return 'New!';
  };

  const getSpecialDayMessage = () => {
  const { years, remainingMonths, isYearlyAnniversary, isMonthlyAnniversary } = stats;
  
  if (isYearlyAnniversary) {
    return {
      emoji: '🎉',
      title: `Happy ${years} Year${years > 1 ? 's' : ''} Anniversary!`,
      message: `${years} amazing year${years > 1 ? 's' : ''} of pure love and happiness! Here's to forever! 🥂`
    };
    } else if (isMonthlyAnniversary) {
      let timeString;
      if (years > 0 && remainingMonths > 0) {
        timeString = `${years} Year${years > 1 ? 's' : ''} & ${remainingMonths} Month${remainingMonths > 1 ? 's' : ''}`;
      } else if (years > 0) {
        timeString = `${years} Year${years > 1 ? 's' : ''}`;
      } else {
        timeString = `${remainingMonths} Month${remainingMonths > 1 ? 's' : ''}`;
      }
      
      return {
        emoji: '💕',
        title: `Happy Monthly Anniversary!`,
        message: `Celebrating ${timeString} of beautiful moments together! 💖`
      };
    }
    return null;
  };

  const specialDay = getSpecialDayMessage();

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
    <div className={`home ${stats.isYearlyAnniversary ? 'anniversary-mode' : ''} ${stats.isMonthlyAnniversary && !stats.isYearlyAnniversary ? 'monthly-mode' : ''}`}>
      
      {/* Floating hearts for special days */}
      {(stats.isMonthlyAnniversary || stats.isYearlyAnniversary) && (
        <div className="celebration-bg">
          {[...Array(15)].map((_, i) => (
            <span
              key={i}
              className={`floating-celebration ${stats.isYearlyAnniversary ? 'anniversary' : 'monthly'}`}
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${4 + Math.random() * 4}s`,
                fontSize: `${1 + Math.random() * 1.5}rem`
              }}
            >
              {stats.isYearlyAnniversary 
                ? ['🎉', '🎊', '💖', '✨', '🥂', '💕'][Math.floor(Math.random() * 6)]
                : ['💕', '💗', '💖', '✨', '💘'][Math.floor(Math.random() * 5)]
              }
            </span>
          ))}
        </div>
      )}

      {/* Special Day Banner */}
      {specialDay && (
        <div className={`special-day-banner ${visible ? 'visible' : ''} ${stats.isYearlyAnniversary ? 'anniversary' : 'monthly'}`}>
          <span className="banner-emoji">{specialDay.emoji}</span>
          <h2 className="banner-title">{specialDay.title}</h2>
          <p className="banner-message">{specialDay.message}</p>
          <div className="banner-sparkles">
            <span>✨</span>
            <span>💖</span>
            <span>✨</span>
          </div>
        </div>
      )}

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
              {meta?.startDate ? new Date(meta.startDate + 'T12:00:00').toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              }) : 'Forever'}
            </span>
          </div>
        </div>
      </div>

      <div className={`home-stats ${visible ? 'visible' : ''}`}>
        {/* NEW: Time Together Card */}
        <Card className="stat-card time-together-card" hover>
          <span className="stat-icon">💑</span>
          <span className="stat-value">{getTimeTogether()}</span>
          <span className="stat-label">Together</span>
        </Card>

        <Card className="stat-card" hover>
          <span className="stat-icon">📆</span>
          <span className="stat-value">{stats.days.toLocaleString()}</span>
          <span className="stat-label">Days</span>
        </Card>

        <Card className="stat-card" hover>
          <span className="stat-icon">🌙</span>
          <span className="stat-value">{stats.totalMonths}</span>
          <span className="stat-label">Months</span>
        </Card>

        <Card className="stat-card anniversary-card" hover>
          <span className="stat-icon">🎂</span>
          <span className="stat-value">{stats.nextAnniversary}</span>
          <span className="stat-label">To Anniversary</span>
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