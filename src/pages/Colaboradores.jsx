import React, { useState, useEffect, useRef } from 'react';
import linkedinImg from "../assets/img/Linkedin.png";
import inversoresImg from "../assets/img/inversores.jpg";
import patrocinadoresImg from "../assets/img/creadores.jpg";
import cocreacionImg from "../assets/img/pilar.jpg";
import ContactModal from './contactModal.jsx';

// Define el número de WhatsApp de la empresa (formato internacional sin "+")
const WHATSAPP_NUMBER = '34691976233';

const Colaboradores = () => {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [showContactModal, setShowContactModal] = useState(false);
  const [visibleItems, setVisibleItems] = useState([]);
  const [isInView, setIsInView] = useState(false);
  const sectionRef = useRef(null);

  // Función para abrir WhatsApp con mensaje genérico
  const openWhatsAppGeneric = () => {
    const genericMessage = '¡Hola! Me interesa conocer más sobre las oportunidades de colaboración con IN RESET. Me gustaría que me contacten para obtener más información.';
    const encodedMessage = encodeURIComponent(genericMessage);
    const whatsappLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
    window.open(whatsappLink, '_blank');
  };

  // Funciones para abrir y cerrar el modal de contacto
  const handleOpenContactModal = () => setShowContactModal(true);
  const handleCloseContactModal = () => setShowContactModal(false);

  const colaboradoresData = [
    {
      id: 'empresas',
      title: 'Empresas & Marcas',
      subtitle: 'Accede a audiencias altamente segmentadas y comprometidas',
      description: 'Genera conexiones auténticas que impulsan resultados medibles.',
      image: cocreacionImg,
      number: "01"
    },
    {
      id: 'inversores',
      title: 'Inversores',
      subtitle: 'Únete al crecimiento de mercados emergentes con alta demanda',
      description: 'Oportunidad real en tecnología educativa y de bienestar con potencial escalable.',
      image: inversoresImg,
      number: "02"
    },
    {
      id: 'patrocinadores',
      title: 'Patrocinadores',
      subtitle: 'Posicionamiento estratégico en mercados emergentes',
      description: 'Visibilidad premium en experiencias que generan comunidad y fidelización.',
      image: linkedinImg,
      number: "03"
    },
    {
      id: 'cocreacion',
      title: 'Co-Creación',
      subtitle: 'Imagina crear la próxima revolución tecnológica juntos',
      description: 'Desarrollamos productos que no existen pero que el mundo necesita.',
      image: patrocinadoresImg,
      number: "04"
    }
  ];

  // Intersection Observer para animaciones
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            colaboradoresData.forEach((_, index) => {
              setTimeout(() => {
                setVisibleItems(prev => {
                  if (!prev.includes(index)) {
                    return [...prev, index];
                  }
                  return prev;
                });
              }, index * 200);
            });
          }
        });
      },
      { 
        threshold: 0.2,
        rootMargin: '0px 0px -100px 0px'
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section 
      ref={sectionRef}
      id="contacto" 
      className="py-5 position-relative" 
      style={{ 
        paddingTop: '100px',
        paddingBottom: '100px',
        scrollMarginTop: '80px',
        overflow: 'hidden'
      }}
    >
      <div className="container position-relative">
        {/* Header */}
        <div className="row mb-5">
          <div className="col-12 col-lg-8 mx-auto text-center">
            <h2
              className="display-5 fw-light mb-0"
              style={{
                color: 'white',
                lineHeight: '1.2',
                letterSpacing: '-0.02em',
                fontWeight: '300',
                textShadow: '0 2px 4px rgba(0,0,0,0.3)'
              }}
            >
              Colabora con <span style={{ color: '#8B5CF6', fontWeight: '400' }}>Nosotros</span>
            </h2>
            
            <p 
              className="mb-1 fs-5" 
              style={{ 
                lineHeight: '1.6',
                maxWidth: '600px',
                margin: '0 auto 1.5rem auto',
                color: 'rgba(255, 255, 255, 0.8)'
              }}
            >
              Construye el futuro con IN RESET
            </p>
          </div>
        </div>

        {/* Cards Grid */}
        <div className="row g-4 mb-5">
          {colaboradoresData.map((item, index) => {
            const isHovered = hoveredCard === item.id;
            const isVisible = visibleItems.includes(index);
            
            return (
              <div key={item.id} className="col-12 col-sm-6 col-lg-3">
                <div
                  className="position-relative h-100 overflow-hidden d-flex flex-column"
                  style={{
                    background: 'rgba(255, 255, 255, 0.03)',
                    border: isVisible 
                      ? '1px solid rgba(139, 92, 246, 0.25)'
                      : '1px solid rgba(255, 255, 255, 0.08)',
                    borderRadius: '12px',
                    minHeight: '280px',
                    boxShadow: isVisible
                      ? '0 4px 20px rgba(139, 92, 246, 0.15)'
                      : '0 2px 15px rgba(0, 0, 0, 0.2)',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? 'translateY(0) scale(1)' : 'translateY(30px) scale(0.95)',
                    transitionDelay: `${index * 0.1}s`
                  }}
                  onMouseEnter={() => {
                    setHoveredCard(item.id);
                  }}
                  onMouseLeave={() => {
                    setHoveredCard(null);
                  }}
                >
                  {/* Background Image with overlay */}
                  <div
                    className="position-absolute w-100 h-100"
                    style={{
                     backgroundImage: `linear-gradient(135deg, rgba(0,0,0,0.7), rgba(139, 92, 246, 0.1)), url(${item.image})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      opacity: isHovered ? '0.4' : '0.2',
                      transition: 'opacity 0.3s ease',
                      zIndex: 1
                    }}
                  />

                  {/* Content */}
                  <div className="position-relative h-100 p-3 d-flex flex-column text-start" style={{ zIndex: 2 }}>
                    
                    {/* Número */}
                    <div className="mb-1">
                      <span 
                        className="fw-light d-block"
                        style={{
                          fontSize: '1.6rem',
                          color: isVisible 
                            ? '#8B5CF6'
                            : 'rgba(255, 255, 255, 0.3)',
                          transition: 'all 0.5s ease',
                          fontWeight: '200',
                          lineHeight: '1'
                        }}
                      >
                        {item.number}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 
                      className="fw-normal mb-1"
                      style={{ 
                        color: 'white',
                        fontSize: '1.1rem',
                        lineHeight: '1.3',
                        fontWeight: '400'
                      }}
                    >
                      {item.title}
                    </h3>
                    
                    {/* Subtitle */}
                    <p 
                      className="mb-2 fs-6"
                      style={{ 
                        color: 'rgba(255, 255, 255, 0.7)',
                        lineHeight: '1.4',
                        fontSize: '0.85rem'
                      }}
                    >
                      {item.subtitle}
                    </p>
                    
                    {/* Expanded Content - Siempre visible sin botones */}
                    <div className="flex-grow-1 d-flex flex-column justify-content-end">
                      <div
                        style={{
                          opacity: 1,
                          overflow: 'visible'
                        }}
                      >
                        <div
                          className="mb-2"
                          style={{
                            height: '1px',
                            background: 'linear-gradient(90deg, transparent, #8B5CF6, transparent)',
                            borderRadius: '1px',
                            width: '100%'
                          }}
                        />

                        <p 
                          className="mb-0 text-start"
                          style={{ 
                            color: 'rgba(255, 255, 255, 0.7)',
                            lineHeight: '1.4',
                            fontSize: '0.8rem'
                          }}
                        >
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Call to Action Section */}
        <div className="row mt-5">
          <div className="col-12">
            <div 
              className="py-4 px-4"
              style={{
                background: 'rgba(255, 255, 255, 0.03)',
                borderRadius: '16px',
                border: '1px solid rgba(139, 92, 246, 0.25)',
                boxShadow: '0 4px 20px rgba(139, 92, 246, 0.15)'
              }}
            >
              <div className="text-center">
                <h3 
                  className="mb-3 fw-normal"
                  style={{ 
                    color: 'white',
                    fontSize: '1.4rem',
                    fontWeight: '400'
                  }}
                >
                  Únete a la revolución
                </h3>
                
                <p 
                  className="mb-4 fs-6"
                  style={{ 
                    color: 'rgba(255, 255, 255, 0.8)',
                    lineHeight: '1.5',
                    maxWidth: '450px',
                    margin: '0 auto 1.5rem auto'
                  }}
                >
                  Forma parte de nuestra red de colaboradores.
                </p>

                {/* Botones de contacto */}
                <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center">
                  {/* Botón WhatsApp */}
                  <button
                    type="button"
                    className="btn px-4 py-2 fw-semibold d-flex align-items-center justify-content-center gap-2"
                    onClick={openWhatsAppGeneric}
                    style={{
                      background: 'transparent',
                      border: '2px solid #25D366',
                      color: '#25D366',
                      borderRadius: '10px',
                      boxShadow: '0 2px 8px rgba(37, 211, 102, 0.2)',
                      transition: 'all 0.3s ease',
                      fontSize: '0.9rem',
                      minWidth: '160px'
                    }}
                    onMouseOver={(e) => {
                      e.target.style.transform = 'translateY(-2px)';
                      e.target.style.boxShadow = '0 4px 15px rgba(37, 211, 102, 0.3)';
                      e.target.style.background = 'rgba(37, 211, 102, 0.1)';
                    }}
                    onMouseOut={(e) => {
                      e.target.style.transform = 'translateY(0)';
                      e.target.style.boxShadow = '0 2px 8px rgba(37, 211, 102, 0.2)';
                      e.target.style.background = 'transparent';
                    }}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.893 3.786"/>
                    </svg>
                    WhatsApp
                  </button>

                  {/* Botón Email */}
                  <button
                    type="button"
                    className="btn px-4 py-2 fw-semibold d-flex align-items-center justify-content-center gap-2"
                    onClick={handleOpenContactModal}
                    style={{
                      background: 'transparent',
                      border: '2px solid #8B5CF6',
                      color: '#8B5CF6',
                      borderRadius: '10px',
                      boxShadow: '0 2px 8px rgba(139, 92, 246, 0.2)',
                      transition: 'all 0.3s ease',
                      fontSize: '0.9rem',
                      minWidth: '160px'
                    }}
                    onMouseOver={(e) => {
                      e.target.style.transform = 'translateY(-2px)';
                      e.target.style.boxShadow = '0 4px 15px rgba(139, 92, 246, 0.3)';
                      e.target.style.background = 'rgba(139, 92, 246, 0.1)';
                    }}
                    onMouseOut={(e) => {
                      e.target.style.transform = 'translateY(0)';
                      e.target.style.boxShadow = '0 2px 8px rgba(139, 92, 246, 0.2)';
                      e.target.style.background = 'transparent';
                    }}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                    </svg>
                    Enviar Email
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Modal Component */}
      <ContactModal show={showContactModal} handleClose={handleCloseContactModal} />
    </section>
  );
};

export default Colaboradores;