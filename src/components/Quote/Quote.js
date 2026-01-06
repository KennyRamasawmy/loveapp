import { useState, useEffect } from 'react';
import { useAppData } from '../../hooks/useAppData';
import { Card } from '../UI';
import './Quote.css';

const Quote = () => {
  const { data, loading } = useAppData();
  const [todayQuote, setTodayQuote] = useState(null);
  const [visible, setVisible] = useState(false);

  const fallbackQuotes = [
    "You are my today and all of my tomorrows.",
    "In you, I've found the love of my life and my closest friend.",
    "Every love story is beautiful, but ours is my favorite.",
    "I fell in love with you because of all the small things you don't even realize you do.",
    "You make my heart smile every single day."
  ];

  useEffect(() => {
    if (data?.dailyQuotes) {
      findTodayQuote(data.dailyQuotes);
    }
    setTimeout(() => setVisible(true), 100);
  }, [data]);

  const findTodayQuote = (quotes) => {
    const today = new Date().toISOString().split('T')[0];
    const found = quotes.find(q => q.date === today);
    
    if (found) {
      setTodayQuote(found.quote);
    } else {
      // Random fallback
      const randomIndex = Math.floor(Math.random() * fallbackQuotes.length);
      setTodayQuote(fallbackQuotes[randomIndex]);
    }
  };

  const getFormattedDate = () => {
    return new Date().toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="quote-loading">
        <span className="loading-heart">💌</span>
        <p>Finding today's love note...</p>
      </div>
    );
  }

  return (
    <div className="quote">
      <div className="quote-background">
        <div className="bg-shape shape-1"></div>
        <div className="bg-shape shape-2"></div>
        <div className="bg-shape shape-3"></div>
      </div>

      <div className={`quote-content ${visible ? 'visible' : ''}`}>
        <header className="quote-header">
          <span className="header-icon">💌</span>
          <h1 className="header-title">Daily Love Note</h1>
          <p className="header-date">{getFormattedDate()}</p>
        </header>

        <Card className="quote-card">
          <div className="quote-decoration quote-deco-left">"</div>
          <div className="quote-decoration quote-deco-right">"</div>
          
          <div className="quote-inner">
            <p className="quote-text">{todayQuote}</p>
          </div>

          <div className="quote-footer">
            <span className="quote-heart">💕</span>
            <span className="quote-signature">For you, always</span>
          </div>
        </Card>

        <div className="quote-extras">
          <div className="extra-item">
            <span className="extra-icon">🌅</span>
            <span className="extra-text">New quote every day</span>
          </div>
          <div className="extra-item">
            <span className="extra-icon">💝</span>
            <span className="extra-text">Written with love</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Quote;