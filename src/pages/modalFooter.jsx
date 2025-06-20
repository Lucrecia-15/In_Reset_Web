import React from 'react';

const InfoModal = ({ isOpen, onClose, title, content }) => {
  if (!isOpen) return null;

  return (
    <>
      <div 
        className="modal-backdrop" 
        onClick={onClose} 
        style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          zIndex: 999,
        }}
      />

      <div 
        className="modal-container"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          backgroundColor: '#111111',
          borderRadius: '8px',
          width: '90%',
          maxWidth: '600px',
          maxHeight: '80vh',
          overflowY: 'auto',
          zIndex: 1000,
          padding: '2rem 3rem',
          boxShadow: '0 0 20px rgba(0,0,0,0.7)',
        }}
      >
        {/* Botón X cerrar */}
        <button
          onClick={onClose}
          aria-label="Cerrar modal"
          style={{
            position: 'absolute',
            top: '1rem',
            right: '1rem',
            background: 'transparent',
            border: 'none',
            color: 'white',
            fontSize: '2.5rem', // Cruz más grande
            fontWeight: 'bold',
            cursor: 'pointer',
            lineHeight: 1,
            padding: '0.5rem', // Más área clickable
          }}
        >
          &times;
        </button>

        <h2 
          id="modal-title" 
          style={{ 
            color: 'white', 
            marginBottom: '0.75rem', 
            fontFamily: 'var(--font-title)', 
            borderBottom: '1px solid #666', // línea divisoria gris fina
            paddingBottom: '0.5rem',
          }}
        >
          {title}
        </h2>

        <div className="footer-modal-content" style={{ color: 'white' }}>
          {content}
        </div>
      </div>
    </>
  );
};

export default InfoModal;
