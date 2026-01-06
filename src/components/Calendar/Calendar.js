import { useState, useEffect } from 'react';
import { useAppData } from '../../hooks/useAppData';
import { Modal, Card } from '../UI';
import './Calendar.css';

const Calendar = () => {
  const { data, loading } = useAppData();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedNote, setSelectedNote] = useState(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setVisible(true), 100);
  }, []);

  const calendarNotes = data?.calendarNotes || [];

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDay = firstDay.getDay();

    return { daysInMonth, startingDay };
  };

  const formatDateKey = (year, month, day) => {
    return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  };

  const getNoteForDate = (dateKey) => {
    return calendarNotes.find(note => note.date === dateKey);
  };

  const isToday = (day) => {
    const today = new Date();
    return (
      day === today.getDate() &&
      currentDate.getMonth() === today.getMonth() &&
      currentDate.getFullYear() === today.getFullYear()
    );
  };

  const goToPrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const goToNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  const { daysInMonth, startingDay } = getDaysInMonth(currentDate);

  const monthName = currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const getTypeEmoji = (type) => {
    switch (type) {
      case 'anniversary': return '💍';
      case 'memory': return '💭';
      case 'surprise': return '🎁';
      default: return '💕';
    }
  };

  const getTypeLabel = (type) => {
    switch (type) {
      case 'anniversary': return 'Anniversary';
      case 'memory': return 'Memory';
      case 'surprise': return 'Surprise';
      default: return 'Special';
    }
  };

  if (loading) {
    return (
      <div className="calendar-loading">
        <span className="loading-heart">📅</span>
        <p>Loading our dates...</p>
      </div>
    );
  }

  return (
    <div className="calendar">
      <header className={`calendar-header ${visible ? 'visible' : ''}`}>
        <span className="header-icon">📅</span>
        <h1 className="header-title">Our Calendar</h1>
        <p className="header-subtitle">Special dates & memories</p>
      </header>

      <Card className={`calendar-card ${visible ? 'visible' : ''}`}>
        <div className="calendar-nav">
          <button className="nav-btn" onClick={goToPrevMonth}>
            <span>←</span>
          </button>
          <div className="nav-center">
            <h2 className="nav-month">{monthName}</h2>
            <button className="today-btn" onClick={goToToday}>Today</button>
          </div>
          <button className="nav-btn" onClick={goToNextMonth}>
            <span>→</span>
          </button>
        </div>

        <div className="calendar-grid">
          {weekDays.map(day => (
            <div key={day} className="calendar-weekday">{day}</div>
          ))}

          {Array.from({ length: startingDay }).map((_, i) => (
            <div key={`empty-${i}`} className="calendar-day empty"></div>
          ))}

          {Array.from({ length: daysInMonth }).map((_, i) => {
            const day = i + 1;
            const dateKey = formatDateKey(
              currentDate.getFullYear(),
              currentDate.getMonth(),
              day
            );
            const note = getNoteForDate(dateKey);
            const today = isToday(day);

            return (
              <div
                key={day}
                className={`calendar-day ${today ? 'today' : ''} ${note ? 'has-note' : ''}`}
                onClick={() => note && setSelectedNote(note)}
              >
                <span className="day-number">{day}</span>
                {note && (
                  <span className="day-indicator">{getTypeEmoji(note.type)}</span>
                )}
              </div>
            );
          })}
        </div>

        <div className="calendar-legend">
          <div className="legend-item">
            <span className="legend-dot anniversary"></span>
            <span>Anniversary</span>
          </div>
          <div className="legend-item">
            <span className="legend-dot memory"></span>
            <span>Memory</span>
          </div>
          <div className="legend-item">
            <span className="legend-dot surprise"></span>
            <span>Surprise</span>
          </div>
        </div>
      </Card>

      <Modal
        isOpen={!!selectedNote}
        onClose={() => setSelectedNote(null)}
        title={selectedNote?.title}
      >
        {selectedNote && (
          <div className="note-modal">
            <div className="note-type">
              <span className="note-emoji">{getTypeEmoji(selectedNote.type)}</span>
              <span className="note-label">{getTypeLabel(selectedNote.type)}</span>
            </div>
            <div className="note-date">
              {new Date(selectedNote.date).toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </div>
            <p className="note-description">{selectedNote.description}</p>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Calendar;