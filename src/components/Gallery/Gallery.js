import { useState, useEffect } from 'react';
import { useAppData } from '../../hooks/useAppData';
import { Modal } from '../UI';
import './Gallery.css';

const Gallery = () => {
  const { data, loading } = useAppData();
  const [selectedImage, setSelectedImage] = useState(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setVisible(true), 100);
  }, []);

  if (loading) {
    return (
      <div className="gallery-loading">
        <span className="loading-heart">📷</span>
        <p>Loading memories...</p>
      </div>
    );
  }

  const gallery = data?.gallery || [];

  return (
    <div className="gallery">
      <header className={`gallery-header ${visible ? 'visible' : ''}`}>
        <span className="header-icon">📷</span>
        <h1 className="header-title">Our Gallery</h1>
        <p className="header-subtitle">Captured moments of us</p>
      </header>

      {gallery.length === 0 ? (
        <div className={`gallery-empty ${visible ? 'visible' : ''}`}>
          <span className="empty-icon">🖼️</span>
          <p>No photos yet. Add some memories!</p>
        </div>
      ) : (
        <div className={`gallery-grid ${visible ? 'visible' : ''}`}>
          {gallery.map((item, index) => (
            <div
              key={item.id || index}
              className="gallery-item"
              style={{ animationDelay: `${index * 0.1}s` }}
              onClick={() => setSelectedImage(item)}
            >
              <div className="gallery-image-wrapper">
                {item.base64 ? (
                  <img
                    src={item.base64}
                    alt={item.caption || 'Memory'}
                    className="gallery-image"
                  />
                ) : (
                  <div className="gallery-placeholder">
                    <span>💕</span>
                  </div>
                )}
                <div className="gallery-overlay">
                  <span className="overlay-icon">🔍</span>
                </div>
              </div>
              {item.caption && (
                <p className="gallery-caption">{item.caption}</p>
              )}
            </div>
          ))}
        </div>
      )}

      <Modal
        isOpen={!!selectedImage}
        onClose={() => setSelectedImage(null)}
      >
        {selectedImage && (
          <div className="gallery-modal-content">
            {selectedImage.base64 ? (
              <img
                src={selectedImage.base64}
                alt={selectedImage.caption || 'Memory'}
                className="modal-image"
              />
            ) : (
              <div className="modal-placeholder">
                <span>💕</span>
              </div>
            )}
            {selectedImage.caption && (
              <p className="modal-caption">{selectedImage.caption}</p>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Gallery;