const AdminCalendar = ({ data = [], categories = [], onChange }) => {
  const calendarData = Array.isArray(data) ? data : [];
  const categoriesData = Array.isArray(categories) ? categories : [];

  // Default categories if none exist
  const defaultCategories = [
    { id: "anniversary", name: "Anniversary", emoji: "🎉" },
    { id: "memory", name: "Memory", emoji: "💭" },
    { id: "surprise", name: "Surprise", emoji: "🎁" }
  ];

  const availableCategories = categoriesData.length > 0 ? categoriesData : defaultCategories;

  const addNote = () => {
    const today = new Date().toISOString().split('T')[0];
    const defaultType = availableCategories[0]?.id || 'memory';
    const newNote = {
      id: Date.now().toString(),
      date: today,
      title: '',
      description: '',
      type: defaultType
    };
    onChange([...calendarData, newNote]);
  };

  const updateNote = (index, field, value) => {
    const updated = [...calendarData];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  const deleteNote = (index) => {
    const updated = calendarData.filter((_, i) => i !== index);
    onChange(updated);
  };

  const sortedData = [...calendarData].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  const getCategoryEmoji = (typeId) => {
    const cat = availableCategories.find(c => c.id === typeId);
    return cat?.emoji || '💗';
  };

  return (
    <div className="admin-calendar">
      <h3 className="admin-section-title">📅 Calendar Notes</h3>

      <div className="calendar-items">
        {sortedData.map((item) => {
          const originalIndex = calendarData.findIndex(n => n.id === item.id);
          return (
            <div key={item.id} className="admin-item-card">
              <div className="admin-item-header">
                <span className="admin-item-title">
                  {getCategoryEmoji(item.type)} {item.title || 'Untitled Note'}
                </span>
                <button
                  className="admin-delete-btn"
                  onClick={() => deleteNote(originalIndex)}
                >
                  Delete
                </button>
              </div>

              <div className="admin-form-row">
                <div className="admin-form-group">
                  <label className="admin-form-label">Date</label>
                  <input
                    type="date"
                    className="admin-form-input"
                    value={item.date || ''}
                    onChange={(e) => updateNote(originalIndex, 'date', e.target.value)}
                  />
                </div>

                <div className="admin-form-group">
                  <label className="admin-form-label">Category</label>
                  <select
                    className="admin-form-input"
                    value={item.type || ''}
                    onChange={(e) => updateNote(originalIndex, 'type', e.target.value)}
                  >
                    {availableCategories.map(cat => (
                      <option key={cat.id} value={cat.id}>
                        {cat.emoji} {cat.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="admin-form-group">
                <label className="admin-form-label">Title</label>
                <input
                  type="text"
                  className="admin-form-input"
                  value={item.title || ''}
                  onChange={(e) => updateNote(originalIndex, 'title', e.target.value)}
                  placeholder="Note title..."
                />
              </div>

              <div className="admin-form-group" style={{ marginBottom: 0 }}>
                <label className="admin-form-label">Description</label>
                <textarea
                  className="admin-form-textarea"
                  value={item.description || ''}
                  onChange={(e) => updateNote(originalIndex, 'description', e.target.value)}
                  placeholder="Describe this special day..."
                  rows={2}
                />
              </div>
            </div>
          );
        })}
      </div>

      <button className="admin-add-btn" onClick={addNote}>
        <span>+</span> Add Calendar Note
      </button>

      <p className="admin-hint">
        💡 Manage categories in the "Categories" tab. Your custom categories will appear here.
      </p>
    </div>
  );
};

export default AdminCalendar;