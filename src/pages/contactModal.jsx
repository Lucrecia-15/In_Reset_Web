import React, { useState, useEffect } from 'react';
import contactSideImage from "../assets/img/contactSideImage.jpg";

const ContactModal = ({ show, handleClose }) => {
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    email: '',
    telefono: '',
    mensaje: '',
    privacidad: false,
    empresasMarcas: false,
    inversores: false,
    patrocinadores: false,
    coCreacion: false,
  });

const handleChange = (e) => {
  const { name, value, type, checked } = e.target;

  // Si el campo es uno de los intereses
  const interestKeys = ['empresasMarcas', 'inversores', 'patrocinadores', 'coCreacion'];

  if (type === 'checkbox' && interestKeys.includes(name)) {
    // Si se está seleccionando uno, desmarcar los demás
    const newInterests = interestKeys.reduce((acc, key) => {
      acc[key] = key === name ? checked : false;
      return acc;
    }, {});

    setFormData({
      ...formData,
      ...newInterests
    });
  } else {
    // Cambio normal (texto o privacidad)
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  }
};


  const WEB3FORMS_ACCESS_KEY = "d044fe50-f8b6-4957-9bc1-b570bd11e785"; // Usa tu propia key

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.privacidad) {
      setShowSuccessMessage(false);
      alert('Debes aceptar los términos de privacidad para enviar el mensaje.');
      return;
    }

    const intereses = [];
    if (formData.empresasMarcas) intereses.push("Empresas & Marcas");
    if (formData.inversores) intereses.push("Inversores");
    if (formData.patrocinadores) intereses.push("Patrocinadores");
    if (formData.coCreacion) intereses.push("Co-creación");

    const payload = {
      access_key: WEB3FORMS_ACCESS_KEY,
      name: `${formData.nombre} ${formData.apellido}`,
      email: formData.email,
      phone: formData.telefono,
      message: formData.mensaje,
      intereses: intereses.join(', '),
      subject: "Nuevo contacto desde IN RESET",
      from_name: "Formulario IN RESET",
      botcheck: ""
    };

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(payload)
      });

      const result = await response.json();

      if (result.success) {
        setShowSuccessMessage(true);
        setFormData({
          nombre: '',
          apellido: '',
          email: '',
          telefono: '',
          mensaje: '',
          privacidad: false,
          empresasMarcas: false,
          inversores: false,
          patrocinadores: false,
          coCreacion: false,
        });

        setTimeout(() => {
          setShowSuccessMessage(false);
          handleClose();
        }, 2000);
      } else {
        console.error('Error from Web3Forms:', result);
        alert(`Error: ${result.message || 'Hubo un error al enviar el mensaje. Inténtalo de nuevo.'}`);
      }

    } catch (error) {
      console.error('Error al enviar formulario:', error);

      if (error.name === 'TypeError' && error.message.includes('fetch')) {
        alert('Error de conexión. Verifica tu conexión a internet e inténtalo nuevamente.');
      } else if (error.message.includes('HTTP error')) {
        alert('Error del servidor. Por favor, intenta nuevamente en unos minutos.');
      } else {
        alert('Error inesperado. Por favor, intenta nuevamente.');
      }
    }
  };

  useEffect(() => {
    document.body.classList.toggle('modal-open', show);
    if (!show) setShowSuccessMessage(false);
    return () => document.body.classList.remove('modal-open');
  }, [show]);

  if (!show) return null;

  return (
    <div
      className="modal fade show"
      style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.7)' }}
      onClick={handleClose}
    >
      <div
        className="modal-dialog modal-dialog-centered modal-xl"
        style={{ maxWidth: '800px', width: '90vw' }}
        onClick={e => e.stopPropagation()}
      >
        <div className="modal-content" style={{ background: 'transparent', border: 'none', borderRadius: '15px' }}>
          <div
            className="modal-body p-0"
            style={{
              background: '#141414',
              borderRadius: '15px',
              border: '1px solid rgba(168, 85, 247, 0.4)',
              boxShadow: '0 6px 20px rgba(0, 0, 0, 0.5)',
            }}
          >
            {showSuccessMessage && (
              <div className="position-absolute w-100 h-100 d-flex align-items-center justify-content-center"
                style={{ background: 'rgba(20, 20, 20, 0.95)', zIndex: 20, borderRadius: '15px' }}
              >
                <div className="text-center">
                  <div style={{ fontSize: '3rem', color: '#a855f7', marginBottom: '1rem' }}>✓</div>
                  <h3 className="text-white mb-2" style={successTitleStyle}>¡Gracias!</h3>
                  <p className="text-white" style={{ opacity: '0.9' }}>Tu mensaje ha sido enviado correctamente</p>
                </div>
              </div>
            )}

            <button
              type="button"
              className="btn-close"
              onClick={handleClose}
              style={closeButtonStyle}
            ></button>

            <div className="row g-0 align-items-stretch" style={{ height: '520px' }}>
              <div className="col-12 col-lg-6 d-flex">
                <div className="p-3 w-100 d-flex flex-column" >
                  <div>
                    <h2 className="text-white text-start mt-1 mb-3" style={titleStyle}>CONTÁCTANOS</h2>
                  </div>
                  <form onSubmit={handleSubmit} className="d-flex flex-column gap-2">
                    <div className="row g-2">
                      <div className="col-6">
                        <label htmlFor="nombre" className="form-label mb-2" style={labelStyle}>Nombre</label>
                        <input type="text" id="nombre" name="nombre" value={formData.nombre} onChange={handleChange} required className="form-control" style={formControlStyleInputs} />
                      </div>
                      <div className="col-6">
                        <label htmlFor="apellido" className="form-label mb-2" style={labelStyle}>Apellido</label>
                        <input type="text" id="apellido" name="apellido" value={formData.apellido} onChange={handleChange} required className="form-control" style={formControlStyleInputs} />
                      </div>
                    </div>

                    <div className="row g-2">
                      <div className="col-6">
                        <label htmlFor="email" className="form-label mb-2" style={labelStyle}>Email</label>
                        <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required className="form-control" style={formControlStyleInputs} />
                      </div>
                      <div className="col-6">
                        <label htmlFor="telefono" className="form-label mb-2" style={labelStyle}>Teléfono</label>
                        <input type="tel" id="telefono" name="telefono" value={formData.telefono} onChange={handleChange} className="form-control" style={formControlStyleInputs} />
                      </div>
                    </div>

                    <div className="row g-1">
                      {[
                        ['empresasMarcas', 'Empresas & Marcas'],
                        ['inversores', 'Inversores'],
                        ['patrocinadores', 'Patrocinadores'],
                        ['coCreacion', 'Co-creación']
                      ].map(([key, label]) => (
                        <div className="col-6" key={key}>
                          <div className="form-check mt-2">
                            <input type="checkbox" id={key} name={key} checked={formData[key]} onChange={handleChange} className="form-check-input" style={checkboxStyle(formData[key])} />
                            <label htmlFor={key} className="form-check-label mb-2" style={{ ...labelStyle, fontSize: '0.8rem',  verticalAlign: 'middle', }}>{label}</label>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div>
                      <label htmlFor="mensaje" className="form-label mb-2" style={labelStyle}>Mensaje</label>
                      <textarea id="mensaje" name="mensaje" rows="2" value={formData.mensaje} onChange={handleChange} required className="form-control" style={formControlStyleInputs}></textarea>
                    </div>

                    <div className="form-check mt-2 mb-4">
                      <input type="checkbox" id="privacidad" name="privacidad" checked={formData.privacidad} onChange={handleChange} required className="form-check-input" style={checkboxStyle(formData.privacidad)} />
                      <label htmlFor="privacidad" className="form-check-label " style={{ ...labelStyle, fontSize: '0.8rem',  verticalAlign: 'middle', }}>Acepto los términos de privacidad</label>
                    </div>

                    <button type="submit" className="btn w-100 text-white fw-semibold px-3 py-2" style={submitButtonStyle}>Enviar mensaje</button>
                  </form>
                </div>
              </div>

              <div className="col-12 col-lg-6 d-none d-lg-flex align-items-center justify-content-center p-0">
                <div className="w-100 h-100 position-relative overflow-hidden" style={imageWrapperStyle}>
                  <img src={contactSideImage} alt="Mujer haciendo yoga" className="img-fluid w-100 h-100" style={imageStyle} />
                  <div className="position-absolute w-100 h-100 top-0 left-0" style={imageOverlayStyle}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const labelStyle = {
  color: '#e0e0e0',
  fontSize: '0.8rem',
  marginBottom: '0.2rem',
};

const formControlStyleInputs = {
  backgroundColor: '#ffffff',
  border: '1px solid #ccc',
  color: '#333',
  borderRadius: '5px',
  padding: '0.4rem 0.6rem',
  fontSize: '0.8rem',
};

const checkboxStyle = (checked) => ({
  backgroundColor: checked ? '#a855f7' : '#fff',
  border: checked ? '1px solid #a855f7' : '1px solid #ccc',
  width: '0.8rem',
  height: '0.8rem',
  appearance: 'none',
  borderRadius: '2px',
  backgroundImage: checked
    ? `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'%3e%3cpath fill='none' stroke='%23fff' stroke-linecap='round' stroke-linejoin='round' stroke-width='3' d='M6 10l3 3l6-6'/%3e%3c/svg%3e")`
    : 'none',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  backgroundSize: '100% 100%',
});

const closeButtonStyle = {
  position: 'absolute',
  top: '15px',
  right: '15px',
  filter: 'invert(1) grayscale(1) brightness(2)',
  backgroundColor: 'transparent',
  border: 'none',
  zIndex: 10,
};

const submitButtonStyle = {
  background: 'linear-gradient(135deg,rgb(73, 30, 102),rgb(116, 41, 185),rgb(150, 85, 211))',
  border: 'none',
  borderRadius: '20px',
  boxShadow: '0 4px 12px rgba(168, 85, 247, 0.3)',
  transition: 'all 0.3s ease',
  fontSize: '0.85rem'
};

const titleStyle = {
  fontSize: '1.6rem',
  background: ' #442386',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
};

const successTitleStyle = {
  background: 'linear-gradient(135deg,rgb(76, 13, 134),rgb(210, 163, 228))',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
};

const imageWrapperStyle = {
  borderRadius: '12px',
  border: '1px solid rgba(6, 182, 212, 0.3)',
  boxShadow: '0 5px 15px rgba(0, 0, 0, 0.2)',
};

const imageStyle = {
  objectFit: 'cover',
  objectPosition: 'center',
  borderRadius: '12px',
  filter: 'brightness(0.9) contrast(1.1) saturate(1.2)',
};

const imageOverlayStyle = {
  background: 'rgba(0, 0, 0, 0.4)',
  borderRadius: '12px',
};

export default ContactModal;