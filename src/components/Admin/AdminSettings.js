const AdminSettings = ({ data, onChange }) => {
  const updateField = (field, value) => {
    onChange({
      ...data,
      [field]: value
    });
  };

  return (
    <div className="admin-settings">
      <h3 className="admin-section-title">⚙️ App Settings</h3>

      <div className="admin-form-group">
        <label className="admin-form-label">Easter Egg Trigger Word</label>
        <input
          type="text"
          className="admin-form-input"
          value={data?.easterEggTrigger || ''}
          onChange={(e) => updateField('easterEggTrigger', e.target.value)}
          placeholder="iloveyou"
        />
        <p className="admin-hint">
          💡 Type this word anywhere to reveal the secret message.
        </p>
      </div>

      <div className="admin-form-group">
        <label className="admin-form-label">Accent Color</label>
        <div className="color-picker-row">
          <input
            type="color"
            className="admin-color-input"
            value={data?.accentColor || '#e8a4b8'}
            onChange={(e) => updateField('accentColor', e.target.value)}
          />
          <input
            type="text"
            className="admin-form-input"
            value={data?.accentColor || '#e8a4b8'}
            onChange={(e) => updateField('accentColor', e.target.value)}
            placeholder="#e8a4b8"
            style={{ flex: 1 }}
          />
        </div>
        <p className="admin-hint">
          💡 This feature is for future use. Color customization coming soon!
        </p>
      </div>
    </div>
  );
};

export default AdminSettings;