import React, { useState, useEffect, useRef } from 'react';
import herCodeImage from "../assets/img/hercode.png"; 
import defemmeImage from "../assets/img/defemme.png";

const TechEmpowermentProducts = () => {
  const [visibleCards, setVisibleCards] = useState([]);
  const [isHeaderVisible, setIsHeaderVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !isHeaderVisible) {
          setTimeout(() => {
            setIsHeaderVisible(true);
            setVisibleCards([0, 1]); // Mostrar ambas tarjetas a la vez
          }, 400); // Tiempo de espera antes de mostrar (puedes ajustar)
        }
      });
    },
    { threshold: 0.2, rootMargin: '0px 0px -100px 0px' }
  );

  if (sectionRef.current) {
    observer.observe(sectionRef.current);
  }

  return () => observer.disconnect();
}, [isHeaderVisible]);


  const projects = [
    {
      title: "HER CODE",
      subtitle: "La Catapulta Tecnológica Femenina",
      description: "Gamificación + STEAM",
      image: herCodeImage
    },
    {
      title: "DE FEMME",
      subtitle: "La Revolución del Bienestar Femenino",
      description: "IA + Autocuidado + Autodefensa",
      image: defemmeImage
    }
  ];

  return (
    <section 
      ref={sectionRef}
      id="proyectos" 
      className="position-relative" 
      style={{ 
        paddingTop: '60px',
        paddingBottom: '100px',
        scrollMarginTop: '80px',
        overflow: 'hidden'
      }}
    >
      <div className="container">
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
              Nuestros <span style={{ color: '#8B5CF6', fontWeight: '400' }}>Proyectos</span>
            </h2>
            
            <p 
              className="mb-0 fs-5" 
              style={{ 
                lineHeight: '1.6',
                maxWidth: '600px',
                margin: '0 auto',
                color: 'rgba(255, 255, 255, 0.8)'
              }}
            >
              Convertimos desafíos en Oportunidades.
            </p>
          </div>
        </div>

        {/* Fila de cards */}
        <div className="d-flex flex-column flex-md-row justify-content-center gap-4 flex-wrap">
          {projects.map((project, idx) => (
            <div 
              key={idx} 
              className="d-flex flex-column align-items-stretch"
              style={{
                opacity: visibleCards.includes(idx) ? 1 : 0,
                transform: visibleCards.includes(idx) ? 'translateY(0) scale(1)' : 'translateY(30px) scale(0.95)',
                transition: 'all 1s cubic-bezier(0.16, 1, 0.3, 1)',
                background: 'rgba(255, 255, 255, 0.03)',
                borderRadius: '12px',
                border: visibleCards.includes(idx)
                  ? '1px solid rgba(139, 92, 246, 0.25)'
                  : '1px solid rgba(255, 255, 255, 0.08)',
                boxShadow: visibleCards.includes(idx)
                  ? '0 4px 20px rgba(139, 92, 246, 0.15)'
                  : '0 2px 15px rgba(0, 0, 0, 0.2)',
                cursor: 'pointer',
                overflow: 'hidden',
                width: '100%',
                maxWidth: '540px',
                flex: '1 1 45%',
                minHeight: '260px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center'
              }}
            >
              <div style={{
                flex: '1',
                minHeight: '180px',
                backgroundImage: `url(${project.image})`,
                backgroundSize: 'contain',
backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                position: 'relative'
              }}>
                <div className="position-absolute top-0 start-0 m-3" style={{ zIndex: 3 }}>
                  <span className="badge px-3 py-1 text-white fw-normal"
                        style={{ 
                          background: 'rgba(139, 92, 246, 0.9)',
                          borderRadius: '20px',
                          fontSize: '0.7rem',
                          fontWeight: '300',
                          textTransform: 'uppercase',
                          letterSpacing: '0.5px'
                        }}>
                    En Desarrollo
                  </span>
                </div>
              </div>

              <div className="p-4 d-flex flex-column justify-content-center text-center text-md-start">
                <h3 style={{ 
                  color: 'white',
                  fontSize: '1.3rem',
                  lineHeight: '1.3',
                  fontWeight: '500',
                  textTransform: 'uppercase'
                }}>
                  {project.title}
                </h3>
                
                <h4 style={{ 
                  color: 'rgba(255, 255, 255, 0.8)',
                  fontSize: '1rem',
                  fontWeight: '300',
                  marginBottom: '10px'
                }}>
                  {project.subtitle}
                </h4>
                
                <p style={{ 
                  color: 'rgba(255, 255, 255, 0.7)',
                  fontSize: '0.9rem',
                  lineHeight: '1.5',
                  margin: 0
                }}>
                  {project.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechEmpowermentProducts;