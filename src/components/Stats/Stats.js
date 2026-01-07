import { useState, useEffect } from 'react';
import { useAppData } from '../../hooks/useAppData';
import { Card, Modal, Button } from '../UI';
import './Stats.css';

const Stats = () => {
  const { data, loading, saveData } = useAppData();
  const [visible, setVisible] = useState(false);
  const [editingStat, setEditingStat] = useState(null);
  const [editValue, setEditValue] = useState(0);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newStat, setNewStat] = useState({ label: '', icon: '⭐', value: 0 });

  const defaultStats = [
    { id: 'dates', value: 0, icon: "🍽️", label: "Dates", order: 0 },
    { id: 'kisses', value: 0, icon: "💋", label: "Kisses", order: 1 },
    { id: 'hugs', value: 0, icon: "🤗", label: "Hugs", order: 2 },
    { id: 'movies', value: 0, icon: "🎬", label: "Movies Watched", order: 3 },
    { id: 'trips', value: 0, icon: "✈️", label: "Trips Together", order: 4 },
    { id: 'photos', value: 0, icon: "📸", label: "Photos Taken", order: 5 },
    { id: 'gifts', value: 0, icon: "🎁", label: "Gifts Given", order: 6 },
    { id: 'songs', value: 0, icon: "🎵", label: "Songs Shared", order: 7 },
    { id: 'iloveyous', value: 0, icon: "❤️", label: "I Love You's", order: 8 },
    { id: 'laughs', value: 0, icon: "😂", label: "Laughs Together", order: 9 }
  ];

  const EMOJI_OPTIONS = [
    '❤️', '💋', '🤗', '🍽️', '🎬', '✈️', '📸', '🎁', 
    '🎵', '😤', '🥰', '😂', '🌹', '💐', '🍕', '☕',
    '🎮', '📚', '🏃', '🎉', '🌅', '⭐', '🔥', '💪'
  ];

  useEffect(() => {
    setTimeout(() => setVisible(true), 100);
  }, []);

  if (loading) {
    return (
      <div className="stats-loading">
        <span className="loading-heart">📊</span>
        <p>Loading our stats...</p>
      </div>
    );
  }

  // Convert old object format to array format if needed
  const getStatsArray = () => {
    const savedStats = data?.relationshipStats;
    
    if (!savedStats) {
      return defaultStats;
    }
    
    // If it's already an array, return sorted by order
    if (Array.isArray(savedStats)) {
      return [...savedStats].sort((a, b) => (a.order || 0) - (b.order || 0));
    }
    
    // Convert old object format to array
    const statsArray = Object.entries(savedStats).map(([key, stat], index) => ({
      id: key,
      value: stat.value || 0,
      icon: stat.icon || '⭐',
      label: stat.label || key,
      order: stat.order !== undefined ? stat.order : index
    }));
    
    return statsArray.sort((a, b) => a.order - b.order);
  };

  const stats = getStatsArray();

  const handleIncrement = async (statId) => {
    const updatedStats = stats.map(stat => {
      if (stat.id === statId) {
        return { ...stat, value: (stat.value || 0) + 1 };
      }
      return stat;
    });
    await saveData({ ...data, relationshipStats: updatedStats });
  };

  const handleDecrement = async (statId) => {
    const stat = stats.find(s => s.id === statId);
    if (!stat || (stat.value || 0) <= 0) return;
    
    const updatedStats = stats.map(s => {
      if (s.id === statId) {
        return { ...s, value: s.value - 1 };
      }
      return s;
    });
    await saveData({ ...data, relationshipStats: updatedStats });
  };

  const openEditModal = (statId) => {
    const stat = stats.find(s => s.id === statId);
    if (stat) {
      setEditingStat(statId);
      setEditValue(stat.value || 0);
    }
  };

  const handleSaveEdit = async () => {
    const updatedStats = stats.map(stat => {
      if (stat.id === editingStat) {
        return { ...stat, value: parseInt(editValue) || 0 };
      }
      return stat;
    });
    await saveData({ ...data, relationshipStats: updatedStats });
    setEditingStat(null);
  };

  const handleOpenAddModal = () => {
    setNewStat({ label: '', icon: '⭐', value: 0 });
    setShowAddModal(true);
  };

  const handleAddStat = async () => {
    if (!newStat.label.trim()) {
      alert('Please enter a stat name');
      return;
    }
    
    const newId = 'custom_' + Date.now();
    const maxOrder = stats.reduce((max, s) => Math.max(max, s.order || 0), -1);
    
    const newStatItem = {
      id: newId,
      value: parseInt(newStat.value) || 0,
      icon: newStat.icon,
      label: newStat.label.trim(),
      order: maxOrder + 1
    };
    
    const updatedStats = [...stats, newStatItem];
    
    try {
      await saveData({ ...data, relationshipStats: updatedStats });
      setNewStat({ label: '', icon: '⭐', value: 0 });
      setShowAddModal(false);
    } catch (error) {
      console.error('Error adding stat:', error);
      alert('Failed to add stat. Please try again.');
    }
  };

  const handleDeleteStat = async (statId) => {
    const stat = stats.find(s => s.id === statId);
    if (!stat) return;
    
    if (!window.confirm(`Delete "${stat.label}" stat?`)) return;
    
    const updatedStats = stats.filter(s => s.id !== statId);
    await saveData({ ...data, relationshipStats: updatedStats });
  };

  const getStatById = (statId) => {
    return stats.find(s => s.id === statId);
  };

  const totalStats = stats.reduce((sum, stat) => sum + (stat.value || 0), 0);

  return (
    <div className="stats-page">
      <header className={`stats-header ${visible ? 'visible' : ''}`}>
        <span className="header-icon">📊</span>
        <h1 className="header-title">Our Stats</h1>
        <p className="header-subtitle">Counting our love</p>
      </header>

      {/* Total Counter */}
      <Card className={`total-card ${visible ? 'visible' : ''}`}>
        <div className="total-content">
          <span className="total-icon">💕</span>
          <div className="total-info">
            <span className="total-value">{totalStats.toLocaleString()}</span>
            <span className="total-label">Total Moments Counted</span>
          </div>
        </div>
      </Card>

      {/* Stats Grid */}
      <div className={`stats-grid ${visible ? 'visible' : ''}`}>
        {stats.map((stat, index) => (
          <Card 
            key={stat.id} 
            className="stat-card"
            style={{ animationDelay: `${index * 0.05}s` }}
          >
            <button 
              className="delete-stat-btn"
              onClick={() => handleDeleteStat(stat.id)}
              title="Delete stat"
            >
              ×
            </button>
            
            <div className="stat-icon">{stat.icon}</div>
            <div 
              className="stat-value" 
              onClick={() => openEditModal(stat.id)}
              title="Click to edit"
            >
              {(stat.value || 0).toLocaleString()}
            </div>
            <div className="stat-label">{stat.label}</div>
            
            <div className="stat-controls">
              <button 
                className="control-btn minus"
                onClick={() => handleDecrement(stat.id)}
                disabled={(stat.value || 0) <= 0}
              >
                −
              </button>
              <button 
                className="control-btn plus"
                onClick={() => handleIncrement(stat.id)}
              >
                +
              </button>
            </div>
          </Card>
        ))}

        {/* Add New Stat Card */}
        <div className="stat-card add-stat-card" onClick={handleOpenAddModal}>
          <div className="add-stat-content">
            <span className="add-icon">+</span>
            <span className="add-label">Add New Stat</span>
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      <Modal
        isOpen={!!editingStat}
        onClose={() => setEditingStat(null)}
        title={`Edit ${getStatById(editingStat)?.label || ''}`}
      >
        <div className="edit-stat-form">
          <div className="edit-stat-icon">{getStatById(editingStat)?.icon}</div>
          
          <div className="edit-input-group">
            <button 
              className="edit-btn minus"
              onClick={() => setEditValue(prev => Math.max(0, parseInt(prev) - 1))}
            >
              −
            </button>
            <input
              type="number"
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              className="edit-input"
              min="0"
            />
            <button 
              className="edit-btn plus"
              onClick={() => setEditValue(prev => parseInt(prev) + 1)}
            >
              +
            </button>
          </div>

          <div className="quick-add-buttons">
            <button onClick={() => setEditValue(prev => parseInt(prev) + 5)}>+5</button>
            <button onClick={() => setEditValue(prev => parseInt(prev) + 10)}>+10</button>
            <button onClick={() => setEditValue(prev => parseInt(prev) + 50)}>+50</button>
            <button onClick={() => setEditValue(prev => parseInt(prev) + 100)}>+100</button>
          </div>

          <Button onClick={handleSaveEdit} fullWidth>
            Save 💾
          </Button>
        </div>
      </Modal>

      {/* Add New Stat Modal */}
      <Modal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        title="Add New Stat"
      >
        <div className="add-stat-form">
          <div className="form-group">
            <label>Choose an Icon</label>
            <div className="emoji-grid">
              {EMOJI_OPTIONS.map(emoji => (
                <button
                  key={emoji}
                  type="button"
                  className={`emoji-btn ${newStat.icon === emoji ? 'selected' : ''}`}
                  onClick={() => setNewStat({ ...newStat, icon: emoji })}
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label>Stat Name</label>
            <input
              type="text"
              value={newStat.label}
              onChange={(e) => setNewStat({ ...newStat, label: e.target.value })}
              placeholder="e.g., Coffee Dates"
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label>Starting Value</label>
            <input
              type="number"
              value={newStat.value}
              onChange={(e) => setNewStat({ ...newStat, value: e.target.value })}
              placeholder="0"
              className="form-input"
              min="0"
            />
          </div>

          <Button onClick={handleAddStat} fullWidth>
            Add Stat ✨
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default Stats;