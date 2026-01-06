import { useState, useEffect, useRef } from 'react';
import { useAppData } from '../../hooks/useAppData';
import { Card } from '../UI';
import './Timeline.css';

const Timeline = () => {
  const { data, loading } = useAppData();
  const [visible, setVisible] = useState(false);
  const [visibleItems, setVisibleItems] = useState({});
  const timelineRef = useRef(null);

  useEffect(() => {
    setTimeout(() => setVisible(true), 100);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.dataset.id;
            setVisibleItems((prev) => ({ ...prev, [id]: true }));
          }
        });
      },
      { threshold: 0.2, rootMargin: '0px 0px -50px 0px' }
    );

    const items = document.querySelectorAll('.timeline-item');
    items.forEach((item) => observer.observe(item));

    return () => observer.disconnect();
  }, [data]);

  if (loading) {
    return (
      <div className="timeline-loading">
        <span className="loading-heart">💫</span>
        <p>Loading our journey...</p>
      </div>
    );
  }

  const timeline = data?.timeline || [];

  const sortedTimeline = [...timeline].sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getTimeAgo = (dateStr) => {
    const date = new Date(dateStr);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 30) return `${diffDays} days ago`;
    if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
    return `${Math.floor(diffDays / 365)} years ago`;
  };

  return (
    <div className="timeline">
      <header className={`timeline-header ${visible ? 'visible' : ''}`}>
        <span className="header-icon">💫</span>
        <h1 className="header-title">Our Journey</h1>
        <p className="header-subtitle">Every step together</p>
      </header>

      {sortedTimeline.length === 0 ? (
        <div className={`timeline-empty ${visible ? 'visible' : ''}`}>
          <span className="empty-icon">🛤️</span>
          <p>No memories yet. Start adding your journey!</p>
        </div>
      ) : (
        <div className={`timeline-container ${visible ? 'visible' : ''}`} ref={timelineRef}>
          <div className="timeline-line"></div>

          {sortedTimeline.map((item, index) => (
            <div
              key={item.id || index}
              className={`timeline-item ${visibleItems[item.id || index] ? 'visible' : ''}`}
              data-id={item.id || index}
            >
              <div className="timeline-marker">
                <span className="marker-dot"></span>
                <span className="marker-line"></span>
              </div>

              <Card className="timeline-card" hover>
                <div className="timeline-date">
                  <span className="date-main">{formatDate(item.date)}</span>
                  <span className="date-ago">{getTimeAgo(item.date)}</span>
                </div>

                <h3 className="timeline-title">{item.title}</h3>

                {item.description && (
                  <p className="timeline-description">{item.description}</p>
                )}

                <div className="timeline-heart">💕</div>
              </Card>
            </div>
          ))}

          <div className="timeline-end">
            <span className="end-icon">💖</span>
            <span className="end-text">To be continued...</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Timeline;