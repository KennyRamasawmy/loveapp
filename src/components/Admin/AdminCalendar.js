const AdminCalendar = ({ data, onChange }) => {
  const addNote = () => {
    const today = new Date().toISOString().split('T')[0];
    const newNote = {
      id: Date.now().toString(),
      date: today,
      title: '',
      description: '',
      type: 'memory'
    };
    onChange([...data, newNote]);
  };

  const updateNote = (index, field, value) => {
    const updated = [...data];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  const deleteNote = (index) => {
    const updated = data.filter((_, i) => i !== index);
    onChange(updated);
  };

  const sortedData = [...(data || [])].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  const typeOptions = [
    { value: 'anniversary', label: '💍 Anniversary' },
    { value: 'memory', label: '💭 Memory' },
    { value: 'surprise', label: '🎁 Surprise' }
  ];

  return (
    <div className="admin-calendar">
      <h3 className="admin-section-title">📅 Calendar Notes</h3>

      <div className="calendar-items">
        {sortedData.map((item, index) => {
          const originalIndex = data.findIndex(n => n.id === item.id);
          return (
            <div key={item.id || index} className="admin-item-card">
              <div className="admin-item-header">
                <span className="admin-item-title">
                  {item.title || 'Untitled Note'}
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
                  <label className="admin-form-label">Type</label>
                  <select
                    className="admin-form-input"
                    value={item.type || 'memory'}
                    onChange={(e) => updateNote(originalIndex, 'type', e.target.value)}
                  >
                    {typeOptions.map(opt => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
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
    </div>
  );
};

export default AdminCalendar;