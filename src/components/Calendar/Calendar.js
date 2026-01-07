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
  const calendarCategories = data?.calendarCategories || [];
  const startDate = data?.meta?.startDate;

  // Default categories (fallback)
  const defaultCategories = [
    { id: "anniversary", name: "Anniversary", emoji: "🎉" },
    { id: "monthly", name: "Monthly", emoji: "💕" },
    { id: "memory", name: "Memory", emoji: "💭" },
    { id: "surprise", name: "Surprise", emoji: "🎁" }
  ];

  // Merge custom categories with system categories (monthly, anniversary for auto-generated)
  const systemCategories = [
    { id: "anniversary", name: "Anniversary", emoji: "🎉", isSystem: true },
    { id: "monthly", name: "Monthly", emoji: "💕", isSystem: true }
  ];

  const allCategories = [
    ...systemCategories,
    ...calendarCategories.filter(c => c.id !== 'anniversary' && c.id !== 'monthly')
  ];

  // Parse date string without timezone issues
  const parseDate = (dateStr) => {
    const [year, month, day] = dateStr.split('-').map(Number);
    return new Date(year, month - 1, day);
  };

  // Format date to YYYY-MM-DD without timezone issues
  const formatToDateKey = (year, month, day) => {
    return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  };

  // Generate automatic monthly anniversaries
  const generateMonthlyAnniversaries = () => {
    if (!startDate) return [];

    const start = parseDate(startDate);
    const startDay = start.getDate();
    const startMonth = start.getMonth();
    const startYear = start.getFullYear();
    
    const now = new Date();
    const autoEvents = [];

    const endDate = new Date(now.getFullYear() + 1, now.getMonth(), now.getDate());

    let monthCounter = 1;
    let currentYear = startYear;
    let currentMonth = startMonth + 1;

    while (true) {
      if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
      }

      const checkDate = new Date(currentYear, currentMonth, startDay);
      if (checkDate > endDate) break;

      const years = Math.floor(monthCounter / 12);
      const months = monthCounter % 12;

      let title, description, type;

      const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
      const actualDay = Math.min(startDay, lastDayOfMonth);

      if (months === 0 && years > 0) {
        title = `🎉 ${years} Year${years > 1 ? 's' : ''} Anniversary!`;
        description = `Celebrating ${years} amazing year${years > 1 ? 's' : ''} together!`;
        type = 'anniversary';
      } else {
        if (years > 0) {
          title = `💕 ${years}y ${months}m Together`;
          description = `${years} year${years > 1 ? 's' : ''} and ${months} month${months > 1 ? 's' : ''} of love!`;
        } else {
          title = `💕 ${months} Month${months > 1 ? 's' : ''} Together`;
          description = `Celebrating ${months} month${months > 1 ? 's' : ''} of love!`;
        }
        type = 'monthly';
      }

      const eventDateKey = formatToDateKey(currentYear, currentMonth, actualDay);

      autoEvents.push({
        id: `auto-${monthCounter}`,
        date: eventDateKey,
        title,
        description,
        type,
        isAuto: true
      });

      monthCounter++;
      currentMonth++;
    }

    return autoEvents;
  };

  const allEvents = [...calendarNotes, ...generateMonthlyAnniversaries()];

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDay = firstDay.getDay();

    return { daysInMonth, startingDay };
  };

  const getNotesForDate = (dateKey) => {
    return allEvents.filter(note => note.date === dateKey);
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

  // Get emoji for a category type
  const getTypeEmoji = (type) => {
    const category = allCategories.find(c => c.id === type);
    if (category) return category.emoji;
    
    // Fallback for unknown types
    const defaults = { anniversary: '🎉', monthly: '💕', memory: '💭', surprise: '🎁' };
    return defaults[type] || '💗';
  };

  // Get label for a category type
  const getTypeLabel = (type) => {
    const category = allCategories.find(c => c.id === type);
    if (category) return category.name;
    
    // Fallback
    const defaults = { anniversary: 'Anniversary', monthly: 'Monthly', memory: 'Memory', surprise: 'Surprise' };
    return defaults[type] || 'Special';
  };

  // Get unique categories that have events (for legend)
  const getLegendCategories = () => {
    const usedTypes = new Set(allEvents.map(e => e.type));
    return allCategories.filter(c => usedTypes.has(c.id));
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
            const dateKey = formatToDateKey(
              currentDate.getFullYear(),
              currentDate.getMonth(),
              day
            );
            const notes = getNotesForDate(dateKey);
            const hasNotes = notes.length > 0;
            const today = isToday(day);
            const primaryNote = notes[0];

            return (
              <div
                key={day}
                className={`calendar-day ${today ? 'today' : ''} ${hasNotes ? 'has-note' : ''} ${primaryNote?.type || ''}`}
                onClick={() => hasNotes && setSelectedNote({ date: dateKey, notes })}
              >
                <span className="day-number">{day}</span>
                {hasNotes && (
                  <span className="day-indicator">{getTypeEmoji(primaryNote.type)}</span>
                )}
              </div>
            );
          })}
        </div>

        {/* Dynamic Legend */}
        <div className="calendar-legend">
          {getLegendCategories().map(category => (
            <div key={category.id} className="legend-item">
              <span className="legend-emoji">{category.emoji}</span>
              <span>{category.name}</span>
            </div>
          ))}
        </div>
      </Card>

      <Modal
        isOpen={!!selectedNote}
        onClose={() => setSelectedNote(null)}
        title={selectedNote?.notes?.length > 1 ? 'Events on this day' : selectedNote?.notes?.[0]?.title}
      >
        {selectedNote && (
          <div className="note-modal">
            {selectedNote.notes.map((note, index) => (
              <div key={note.id || index} className={`note-item ${selectedNote.notes.length > 1 ? 'multiple' : ''}`}>
                <div className="note-type">
                  <span className="note-emoji">{getTypeEmoji(note.type)}</span>
                  <span className="note-label">{getTypeLabel(note.type)}</span>
                  {note.isAuto && <span className="note-auto-badge">Auto</span>}
                </div>
                {selectedNote.notes.length > 1 && (
                  <h4 className="note-title">{note.title}</h4>
                )}
                <div className="note-date">
                  {new Date(note.date + 'T12:00:00').toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </div>
                <p className="note-description">{note.description}</p>
              </div>
            ))}
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Calendar;