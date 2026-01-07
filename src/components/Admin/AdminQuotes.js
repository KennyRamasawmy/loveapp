const AdminQuotes = ({ data = [], onChange }) => {
  const quotesData = Array.isArray(data) ? data : [];

  const addQuote = () => {
    const today = new Date().toISOString().split('T')[0];
    const newQuote = {
      id: Date.now().toString(),
      date: today,
      quote: ''
    };
    onChange([...quotesData, newQuote]);
  };

  const updateQuote = (index, field, value) => {
    const updated = [...quotesData];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  const deleteQuote = (index) => {
    const updated = quotesData.filter((_, i) => i !== index);
    onChange(updated);
  };

  const sortedData = [...quotesData].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  return (
    <div className="admin-quotes">
      <h3 className="admin-section-title">💌 Daily Quotes</h3>

      <div className="quotes-items">
        {sortedData.map((item) => {
          const originalIndex = quotesData.findIndex(q => q.id === item.id);
          return (
            <div key={item.id} className="admin-item-card">
              <div className="admin-item-header">
                <span className="admin-item-title">
                  {new Date(item.date).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric'
                  })}
                </span>
                <button
                  className="admin-delete-btn"
                  onClick={() => deleteQuote(originalIndex)}
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
                  onChange={(e) => updateQuote(originalIndex, 'date', e.target.value)}
                />
              </div>

              <div className="admin-form-group" style={{ marginBottom: 0 }}>
                <label className="admin-form-label">Quote</label>
                <textarea
                  className="admin-form-textarea"
                  value={item.quote || ''}
                  onChange={(e) => updateQuote(originalIndex, 'quote', e.target.value)}
                  placeholder="Write a loving quote..."
                  rows={2}
                />
              </div>
            </div>
          );
        })}
      </div>

      <button className="admin-add-btn" onClick={addQuote}>
        <span>+</span> Add Quote
      </button>

      <p className="admin-hint">
        💡 Add quotes for specific dates. If no quote exists for today, a random fallback will show.
      </p>
    </div>
  );
};

export default AdminQuotes;