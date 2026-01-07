import { useRef } from 'react';

const AdminGallery = ({ data = [], onChange }) => {
  const fileInputRef = useRef(null);

  const galleryData = Array.isArray(data) ? data : [];

  const addImage = () => {
    fileInputRef.current?.click();
  };

  const compressImage = (file, maxWidth = 800, quality = 0.7) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          let width = img.width;
          let height = img.height;

          if (width > maxWidth) {
            height = (height * maxWidth) / width;
            width = maxWidth;
          }

          canvas.width = width;
          canvas.height = height;

          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, width, height);

          const compressedBase64 = canvas.toDataURL('image/jpeg', quality);
          resolve(compressedBase64);
        };
        img.src = e.target.result;
      };
      reader.readAsDataURL(file);
    });
  };

  const handleFileSelect = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      const compressedBase64 = await compressImage(file);
      const newImage = {
        id: Date.now().toString(),
        base64: compressedBase64,
        caption: ''
      };
      onChange([...galleryData, newImage]);
    } catch (error) {
      console.error('Error compressing image:', error);
      alert('Error processing image. Please try a smaller image.');
    }

    e.target.value = '';
  };

  const updateImage = (index, field, value) => {
    const updated = [...galleryData];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  const deleteImage = (index) => {
    const updated = galleryData.filter((_, i) => i !== index);
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
        {galleryData.map((item, index) => (
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
        💡 Images are automatically compressed. For best results, use images under 2MB.
      </p>
    </div>
  );
};

export default AdminGallery;