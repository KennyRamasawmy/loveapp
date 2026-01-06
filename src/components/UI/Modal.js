import { useEffect } from 'react';
import './Modal.css';

const Modal = ({ isOpen, onClose, children, title }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content animate-scale-in" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          <span>×</span>
        </button>
        {title && <h3 className="modal-title">{title}</h3>}
        <div className="modal-body">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;