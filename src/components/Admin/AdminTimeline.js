const AdminTimeline = ({ data = [], onChange }) => {
  const timelineData = Array.isArray(data) ? data : [];

  const addMemory = () => {
    const today = new Date().toISOString().split('T')[0];
    const newMemory = {
      id: Date.now().toString(),
      date: today,
      title: '',
      description: ''
    };
    onChange([...timelineData, newMemory]);
  };

  const updateMemory = (index, field, value) => {
    const updated = [...timelineData];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  const deleteMemory = (index) => {
    const updated = timelineData.filter((_, i) => i !== index);
    onChange(updated);
  };

  const sortedData = [...timelineData].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  return (
    <div className="admin-timeline">
      <h3 className="admin-section-title">💫 Timeline Memories</h3>

      <div className="timeline-items">
        {sortedData.map((item) => {
          const originalIndex = timelineData.findIndex(m => m.id === item.id);
          return (
            <div key={item.id} className="admin-item-card">
              <div className="admin-item-header">
                <span className="admin-item-title">
                  {item.title || 'Untitled Memory'}
                </span>
                <button
                  className="admin-delete-btn"
                  onClick={() => deleteMemory(originalIndex)}
                >
                  Delete
                </button>
              </div>

              <div className="admin-form-group">
                <label className="admin-form-label">Date</label>
                <input
                  type="date"
                  className="admin-form-input"
                  value={item.date || ''}
                  onChange={(e) => updateMemory(originalIndex, 'date', e.target.value)}
                />
              </div>

              <div className="admin-form-group">
                <label className="admin-form-label">Title</label>
                <input
                  type="text"
                  className="admin-form-input"
                  value={item.title || ''}
                  onChange={(e) => updateMemory(originalIndex, 'title', e.target.value)}
                  placeholder="Memory title..."
                />
              </div>

              <div className="admin-form-group" style={{ marginBottom: 0 }}>
                <label className="admin-form-label">Description</label>
                <textarea
                  className="admin-form-textarea"
                  value={item.description || ''}
                  onChange={(e) => updateMemory(originalIndex, 'description', e.target.value)}
                  placeholder="Describe this memory..."
                  rows={3}
                />
              </div>
            </div>
          );
        })}
      </div>

      <button className="admin-add-btn" onClick={addMemory}>
        <span>+</span> Add Memory
      </button>
    </div>
  );
};

export default AdminTimeline;