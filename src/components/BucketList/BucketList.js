import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useAppData } from '../../hooks/useAppData';
import { Card, Modal, Button } from '../UI';
import './BucketList.css';

const BucketList = () => {
  const { user } = useAuth();
  const { data, loading, saveData } = useAppData();
  const [visible, setVisible] = useState(false);
  const [filter, setFilter] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [newItem, setNewItem] = useState({
    title: '',
    description: '',
    category: 'experiences'
  });

  useEffect(() => {
    setTimeout(() => setVisible(true), 100);
  }, []);

  if (loading) {
    return (
      <div className="bucket-loading">
        <span className="loading-heart">🎯</span>
        <p>Loading our dreams...</p>
      </div>
    );
  }

  const bucketList = data?.bucketList || [];
  const categories = data?.bucketListCategories || [
    { id: "travel", name: "Travel", emoji: "✈️" },
    { id: "adventure", name: "Adventure", emoji: "🎯" },
    { id: "food", name: "Food & Dining", emoji: "🍽️" },
    { id: "experiences", name: "Experiences", emoji: "✨" },
    { id: "goals", name: "Life Goals", emoji: "🏠" },
    { id: "romance", name: "Romance", emoji: "💕" }
  ];

  const getCategoryEmoji = (categoryId) => {
    const cat = categories.find(c => c.id === categoryId);
    return cat?.emoji || '✨';
  };

  const getCategoryName = (categoryId) => {
    const cat = categories.find(c => c.id === categoryId);
    return cat?.name || 'Other';
  };

  const filteredList = bucketList.filter(item => {
    if (filter === 'all') return true;
    if (filter === 'completed') return item.completed;
    if (filter === 'pending') return !item.completed;
    return item.category === filter;
  });

  const completedCount = bucketList.filter(item => item.completed).length;
  const totalCount = bucketList.length;
  const progressPercent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  const handleToggleComplete = async (itemId) => {
    const updatedList = bucketList.map(item => {
      if (item.id === itemId) {
        return {
          ...item,
          completed: !item.completed,
          completedAt: !item.completed ? new Date().toISOString().split('T')[0] : null
        };
      }
      return item;
    });

    await saveData({ ...data, bucketList: updatedList });
  };

  const handleAddItem = async () => {
    if (!newItem.title.trim()) return;

    const item = {
      id: Date.now().toString(),
      title: newItem.title,
      description: newItem.description,
      category: newItem.category,
      completed: false,
      createdBy: data?.meta?.names?.him === user?.email ? 'him' : 'her',
      createdAt: new Date().toISOString().split('T')[0],
      completedAt: null
    };

    const updatedList = [...bucketList, item];
    await saveData({ ...data, bucketList: updatedList });

    setNewItem({ title: '', description: '', category: 'experiences' });
    setShowAddModal(false);
  };

  const handleUpdateItem = async () => {
    if (!editingItem?.title.trim()) return;

    const updatedList = bucketList.map(item => {
      if (item.id === editingItem.id) {
        return editingItem;
      }
      return item;
    });

    await saveData({ ...data, bucketList: updatedList });
    setEditingItem(null);
  };

  const handleDeleteItem = async (itemId) => {
    if (!window.confirm('Are you sure you want to delete this item?')) return;

    const updatedList = bucketList.filter(item => item.id !== itemId);
    await saveData({ ...data, bucketList: updatedList });
  };

  return (
    <div className="bucket-list">
      <header className={`bucket-header ${visible ? 'visible' : ''}`}>
        <span className="header-icon">🎯</span>
        <h1 className="header-title">Our Bucket List</h1>
        <p className="header-subtitle">Dreams we'll achieve together</p>
      </header>

      {/* Progress Card */}
      <Card className={`progress-card ${visible ? 'visible' : ''}`}>
        <div className="progress-stats">
          <div className="progress-info">
            <span className="progress-number">{completedCount}</span>
            <span className="progress-label">of {totalCount} completed</span>
          </div>
          <div className="progress-percent">{progressPercent}%</div>
        </div>
        <div className="progress-bar">
          <div 
            className="progress-fill" 
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </Card>

      {/* Filters */}
      <div className={`bucket-filters ${visible ? 'visible' : ''}`}>
        <button
          className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
          onClick={() => setFilter('all')}
        >
          All
        </button>
        <button
          className={`filter-btn ${filter === 'pending' ? 'active' : ''}`}
          onClick={() => setFilter('pending')}
        >
          Pending
        </button>
        <button
          className={`filter-btn ${filter === 'completed' ? 'active' : ''}`}
          onClick={() => setFilter('completed')}
        >
          Completed
        </button>
        {categories.map(cat => (
          <button
            key={cat.id}
            className={`filter-btn ${filter === cat.id ? 'active' : ''}`}
            onClick={() => setFilter(cat.id)}
          >
            {cat.emoji}
          </button>
        ))}
      </div>

      {/* Bucket Items */}
      <div className={`bucket-items ${visible ? 'visible' : ''}`}>
        {filteredList.length === 0 ? (
          <div className="bucket-empty">
            <span className="empty-icon">🌟</span>
            <p>No items yet. Add your first dream!</p>
          </div>
        ) : (
          filteredList.map((item, index) => (
            <Card 
              key={item.id} 
              className={`bucket-item ${item.completed ? 'completed' : ''}`}
              hover
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <div className="item-checkbox" onClick={() => handleToggleComplete(item.id)}>
                {item.completed ? (
                  <span className="checkbox checked">✓</span>
                ) : (
                  <span className="checkbox"></span>
                )}
              </div>
              
              <div className="item-content">
                <div className="item-header">
                  <span className="item-category">{getCategoryEmoji(item.category)}</span>
                  <h3 className="item-title">{item.title}</h3>
                </div>
                {item.description && (
                  <p className="item-description">{item.description}</p>
                )}
                <div className="item-meta">
                  <span className="meta-category">{getCategoryName(item.category)}</span>
                  {item.completed && item.completedAt && (
                    <span className="meta-completed">
                      ✓ Completed {new Date(item.completedAt + 'T12:00:00').toLocaleDateString()}
                    </span>
                  )}
                </div>
              </div>

              <div className="item-actions">
                <button 
                  className="action-btn edit"
                  onClick={() => setEditingItem(item)}
                >
                  ✏️
                </button>
                <button 
                  className="action-btn delete"
                  onClick={() => handleDeleteItem(item.id)}
                >
                  🗑️
                </button>
              </div>
            </Card>
          ))
        )}
      </div>

      {/* Add Button */}
      <button className="add-bucket-btn" onClick={() => setShowAddModal(true)}>
        <span>+</span>
      </button>

      {/* Add Modal */}
      <Modal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        title="Add New Dream"
      >
        <div className="bucket-form">
          <div className="form-group">
            <label>What's your dream?</label>
            <input
              type="text"
              value={newItem.title}
              onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
              placeholder="e.g., Visit Paris together"
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label>Description (optional)</label>
            <textarea
              value={newItem.description}
              onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
              placeholder="Add some details..."
              className="form-textarea"
              rows={3}
            />
          </div>

          <div className="form-group">
            <label>Category</label>
            <div className="category-select">
              {categories.map(cat => (
                <button
                  key={cat.id}
                  type="button"
                  className={`category-option ${newItem.category === cat.id ? 'selected' : ''}`}
                  onClick={() => setNewItem({ ...newItem, category: cat.id })}
                >
                  <span className="cat-emoji">{cat.emoji}</span>
                  <span className="cat-name">{cat.name}</span>
                </button>
              ))}
            </div>
          </div>

          <Button onClick={handleAddItem} fullWidth>
            Add to Bucket List 🎯
          </Button>
        </div>
      </Modal>

      {/* Edit Modal */}
      <Modal
        isOpen={!!editingItem}
        onClose={() => setEditingItem(null)}
        title="Edit Dream"
      >
        {editingItem && (
          <div className="bucket-form">
            <div className="form-group">
              <label>What's your dream?</label>
              <input
                type="text"
                value={editingItem.title}
                onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })}
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label>Description</label>
              <textarea
                value={editingItem.description || ''}
                onChange={(e) => setEditingItem({ ...editingItem, description: e.target.value })}
                className="form-textarea"
                rows={3}
              />
            </div>

            <div className="form-group">
              <label>Category</label>
              <div className="category-select">
                {categories.map(cat => (
                  <button
                    key={cat.id}
                    type="button"
                    className={`category-option ${editingItem.category === cat.id ? 'selected' : ''}`}
                    onClick={() => setEditingItem({ ...editingItem, category: cat.id })}
                  >
                    <span className="cat-emoji">{cat.emoji}</span>
                    <span className="cat-name">{cat.name}</span>
                  </button>
                ))}
              </div>
            </div>

            <Button onClick={handleUpdateItem} fullWidth>
              Save Changes 💾
            </Button>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default BucketList;