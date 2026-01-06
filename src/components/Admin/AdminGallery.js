import { useRef } from 'react';

const AdminGallery = ({ data, onChange }) => {
  const fileInputRef = useRef(null);

  const addImage = () => {
    fileInputRef.current?.click();
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const newImage = {
        id: Date.now().toString(),
        base64: event.target.result,
        caption: ''
      };
      onChange([...data, newImage]);
    };
    reader.readAsDataURL(file);

    e.target.value = '';
  };

  const updateImage = (index, field, value) => {
    const updated = [...data];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  const deleteImage = (index) => {
    const updated = data.filter((_, i) => i !== index);
    onChange(updated);
  };

  return (
    <div className="admin-gallery">
      <h3 className="admin-section-title">📷 Gallery Images</h3>

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileSelect}
        accept="image/*"
        style={{ display: 'none' }}
      />

      <div className="gallery-items">
        {data?.map((item, index) => (
          <div key={item.id || index} className="admin-item-card gallery-item-card">
            <div className="admin-item-header">
              <span className="admin-item-title">Image {index + 1}</span>
              <button
                className="admin-delete-btn"
                onClick={() => deleteImage(index)}
              >
                Delete
              </button>
            </div>

            <div className="gallery-preview">
              {item.base64 ? (
                <img src={item.base64} alt={item.caption || 'Preview'} />
              ) : (
                <div className="gallery-placeholder">
                  <span>📷</span>
                </div>
              )}
            </div>

            <div className="admin-form-group" style={{ marginBottom: 0 }}>
              <label className="admin-form-label">Caption</label>
              <input
                type="text"
                className="admin-form-input"
                value={item.caption || ''}
                onChange={(e) => updateImage(index, 'caption', e.target.value)}
                placeholder="Add a caption..."
              />
            </div>
          </div>
        ))}
      </div>

      <button className="admin-add-btn" onClick={addImage}>
        <span>+</span> Add Image
      </button>

      <p className="admin-hint">
        💡 Images are stored as base64. Keep them small for best performance.
      </p>
    </div>
  );
};

export default AdminGallery;