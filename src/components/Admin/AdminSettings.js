import { useTheme } from '../../context/ThemeContext';

const PRESET_COLORS = [
  { name: 'Rose', color: '#e8a4b8' },
  { name: 'Lavender', color: '#b8a4e8' },
  { name: 'Sky', color: '#a4c8e8' },
  { name: 'Mint', color: '#a4e8c8' },
  { name: 'Peach', color: '#e8c4a4' },
  { name: 'Coral', color: '#e8a4a4' },
  { name: 'Gold', color: '#e8d4a4' },
  { name: 'Berry', color: '#c8a4e8' },
];

const AdminSettings = ({ data, onChange }) => {
  const { setAccentColor } = useTheme();

  const updateField = (field, value) => {
    onChange({
      ...data,
      [field]: value
    });

    // Live preview for accent color
    if (field === 'accentColor') {
      setAccentColor(value);
    }
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
        
        {/* Preset Colors */}
        <div className="color-presets">
          {PRESET_COLORS.map((preset) => (
            <button
              key={preset.name}
              type="button"
              className={`color-preset ${data?.accentColor === preset.color ? 'active' : ''}`}
              style={{ backgroundColor: preset.color }}
              onClick={() => updateField('accentColor', preset.color)}
              title={preset.name}
            />
          ))}
        </div>

        {/* Custom Color Picker */}
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
          💡 Choose a preset or pick a custom color. Changes preview instantly!
        </p>
      </div>

      {/* Color Preview */}
      <div className="color-preview-card">
        <div className="preview-header">
          <span className="preview-icon">👀</span>
          <span>Live Preview</span>
        </div>
        <div className="preview-content">
          <div 
            className="preview-button"
            style={{ backgroundColor: data?.accentColor || '#e8a4b8' }}
          >
            Sample Button
          </div>
          <div 
            className="preview-card"
            style={{ borderColor: data?.accentColor || '#e8a4b8' }}
          >
            <span 
              className="preview-text"
              style={{ color: data?.accentColor || '#e8a4b8' }}
            >
              Accent Text
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSettings;