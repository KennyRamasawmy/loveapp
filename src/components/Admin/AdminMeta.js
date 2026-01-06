const AdminMeta = ({ data, onChange }) => {
  const updateField = (field, value) => {
    onChange({
      ...data,
      [field]: value
    });
  };

  const updateName = (key, value) => {
    onChange({
      ...data,
      names: {
        ...data.names,
        [key]: value
      }
    });
  };

  return (
    <div className="admin-meta">
      <h3 className="admin-section-title">💕 Basic Information</h3>

      <div className="admin-form-row">
        <div className="admin-form-group">
          <label className="admin-form-label">His Name</label>
          <input
            type="text"
            className="admin-form-input"
            value={data?.names?.him || ''}
            onChange={(e) => updateName('him', e.target.value)}
            placeholder="Your name"
          />
        </div>

        <div className="admin-form-group">
          <label className="admin-form-label">Her Name</label>
          <input
            type="text"
            className="admin-form-input"
            value={data?.names?.her || ''}
            onChange={(e) => updateName('her', e.target.value)}
            placeholder="Her name"
          />
        </div>
      </div>

      <div className="admin-form-group">
        <label className="admin-form-label">Relationship Start Date</label>
        <input
          type="date"
          className="admin-form-input"
          value={data?.startDate || ''}
          onChange={(e) => updateField('startDate', e.target.value)}
        />
      </div>

      <div className="admin-form-group">
        <label className="admin-form-label">Welcome Message</label>
        <textarea
          className="admin-form-textarea"
          value={data?.welcomeMessage || ''}
          onChange={(e) => updateField('welcomeMessage', e.target.value)}
          placeholder="A sweet welcome message..."
          rows={3}
        />
      </div>

      <div className="admin-form-group">
        <label className="admin-form-label">Secret Message (Easter Egg)</label>
        <textarea
          className="admin-form-textarea"
          value={data?.secretMessage || ''}
          onChange={(e) => updateField('secretMessage', e.target.value)}
          placeholder="A secret love note..."
          rows={3}
        />
      </div>
    </div>
  );
};

export default AdminMeta;