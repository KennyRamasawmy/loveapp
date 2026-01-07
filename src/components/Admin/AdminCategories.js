import { useState } from 'react';

const EMOJI_OPTIONS = [
  '🎉', '💕', '💭', '🎁', '🌹', '💖', '✨', '🎂', 
  '💍', '🥂', '🎊', '💐', '🌸', '🎵', '📸', '✈️',
  '🏠', '👶', '🐾', '💌', '🌙', '☀️', '🎄', '🎃'
];

const AdminCategories = ({ data = [], onChange }) => {
  const [showEmojiPicker, setShowEmojiPicker] = useState(null);
  
  const categoriesData = Array.isArray(data) ? data : [];

  const addCategory = () => {
    const newCategory = {
      id: `cat-${Date.now()}`,
      name: '',
      emoji: '💖'
    };
    onChange([...categoriesData, newCategory]);
  };

  const updateCategory = (index, field, value) => {
    const updated = [...categoriesData];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  const deleteCategory = (index) => {
    // Prevent deleting if less than 2 categories
    if (categoriesData.length <= 1) {
      alert('You must have at least one category.');
      return;
    }
    const updated = categoriesData.filter((_, i) => i !== index);
    onChange(updated);
  };

  const selectEmoji = (index, emoji) => {
    updateCategory(index, 'emoji', emoji);
    setShowEmojiPicker(null);
  };

  return (
    <div className="admin-categories">
      <h3 className="admin-section-title">🏷️ Calendar Categories</h3>
      <p className="admin-intro-text">
        Create custom categories for your calendar events. Each category has a name and emoji that will appear on the calendar.
      </p>

      <div className="categories-items">
        {categoriesData.map((item, index) => (
          <div key={item.id || index} className="admin-item-card category-card">
            <div className="admin-item-header">
              <span className="admin-item-title">
                {item.emoji} {item.name || 'New Category'}
              </span>
              <button
                className="admin-delete-btn"
                onClick={() => deleteCategory(index)}
              >
                Delete
              </button>
            </div>

            <div className="category-form">
              <div className="admin-form-group emoji-group">
                <label className="admin-form-label">Emoji</label>
                <div className="emoji-selector">
                  <button
                    type="button"
                    className="emoji-current"
                    onClick={() => setShowEmojiPicker(showEmojiPicker === index ? null : index)}
                  >
                    {item.emoji || '💖'}
                  </button>
                  
                  {showEmojiPicker === index && (
                    <div className="emoji-picker">
                      {EMOJI_OPTIONS.map((emoji) => (
                        <button
                          key={emoji}
                          type="button"
                          className={`emoji-option ${item.emoji === emoji ? 'selected' : ''}`}
                          onClick={() => selectEmoji(index, emoji)}
                        >
                          {emoji}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="admin-form-group" style={{ flex: 1 }}>
                <label className="admin-form-label">Category Name</label>
                <input
                  type="text"
                  className="admin-form-input"
                  value={item.name || ''}
                  onChange={(e) => updateCategory(index, 'name', e.target.value)}
                  placeholder="e.g., Date Night, Travel, Special..."
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <button className="admin-add-btn" onClick={addCategory}>
        <span>+</span> Add Category
      </button>

      <p className="admin-hint">
        💡 Categories you create here will appear in the calendar event form and legend.
      </p>
    </div>
  );
};

export default AdminCategories;