import React, { useState, useEffect, useRef } from 'react';

const About = () => {
  const [visibleCards, setVisibleCards] = useState([]);
  const [visibleFeatures, setVisibleFeatures] = useState([]);
  const [isHeaderVisible, setIsHeaderVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => setIsHeaderVisible(true), 200);
            
            // Mostrar ambos cards juntos (al mismo tiempo)
            setTimeout(() => setVisibleCards([0, 1]), 600);

            // Iconos visibles uno a uno
            [0, 1, 2, 3].forEach((index) => {
              setTimeout(() => {
                setVisibleFeatures(prev => !prev.includes(index) ? [...prev, index] : prev);
              }, 1400 + (index * 200));
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
      id="nosotros" 
      className="position-relative" 
      style={{ 
        scrollMarginTop: '70px',
        paddingTop: '60px',
        paddingBottom: '100px',
        overflow: 'hidden'
      }}
    >
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-lg-10">
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
                  Sobre <span style={{ color: '#8B5CF6', fontWeight: '400' }}>Nosotros</span>
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
                  ¿Qué nos hace diferentes?.
                </p>
              </div>
            </div>

            {/* Content - Cards de Misión y Qué Somos */}
            <div className="row align-items-stretch mb-5">
              <div className="col-12 col-md-6 mb-4 mb-md-0">
                <div
                  className="p-4 h-100 d-flex flex-column"
                  style={{
                    opacity: visibleCards.includes(0) ? 1 : 0,
                    transform: visibleCards.includes(0) ? 'translateY(0) scale(1)' : 'translateY(30px) scale(0.95)',
                    transition: 'all 1s cubic-bezier(0.16, 1, 0.3, 1)',
                    background: 'rgba(255, 255, 255, 0.03)',
                    borderRadius: '12px',
                    border: visibleCards.includes(0) 
                      ? '1px solid rgba(139, 92, 246, 0.25)'
                      : '1px solid rgba(255, 255, 255, 0.08)',
                    boxShadow: visibleCards.includes(0) 
                      ? '0 4px 20px rgba(139, 92, 246, 0.15)' 
                      : '0 2px 15px rgba(0, 0, 0, 0.2)',
                    cursor: 'pointer',
                    minHeight: '180px'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-3px)';
                    e.currentTarget.style.boxShadow = '0 8px 25px rgba(139, 92, 246, 0.25)';
                    e.currentTarget.style.borderColor = 'rgba(139, 92, 246, 0.3)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 4px 20px rgba(139, 92, 246, 0.15)';
                    e.currentTarget.style.borderColor = 'rgba(139, 92, 246, 0.25)';
                  }}
                >
                  <h3 className="title mb-3" style={{ 
                    color: 'white',
                    fontSize: '1.3rem',
                    lineHeight: '1.3',
                    fontWeight: '400'
                  }}>
                    Quiénes Somos
                  </h3>
                  <p className="mb-0 flex-grow-1" style={{ 
                    color: 'rgba(255, 255, 255, 0.7)',
                    lineHeight: '1.6',
                    fontSize: '0.9rem'
                  }}>
                    Somos la plataforma
                    <span className="text-white"> EdTech-HealthTech </span>
                    que convierte retos en proyectos escalables. 
                    <span className="text-white"> Transformamos cada desafío en oportunidades de impacto real</span>.
                  </p>
                </div>
              </div>
              
              <div className="col-12 col-md-6">
                <div
                  className="p-4 h-100 d-flex flex-column"
                  style={{
                    opacity: visibleCards.includes(1) ? 1 : 0,
                    transform: visibleCards.includes(1) ? 'translateY(0) scale(1)' : 'translateY(30px) scale(0.95)',
                    transition: 'all 1s cubic-bezier(0.16, 1, 0.3, 1)',
                    background: 'rgba(255, 255, 255, 0.03)',
                    borderRadius: '12px',
                    border: visibleCards.includes(1) 
                      ? '1px solid rgba(139, 92, 246, 0.25)'
                      : '1px solid rgba(255, 255, 255, 0.08)',
                    boxShadow: visibleCards.includes(1) 
                      ? '0 4px 20px rgba(139, 92, 246, 0.15)' 
                      : '0 2px 15px rgba(0, 0, 0, 0.2)',
                    cursor: 'pointer',
                    minHeight: '180px'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-3px)';
                    e.currentTarget.style.boxShadow = '0 8px 25px rgba(139, 92, 246, 0.25)';
                    e.currentTarget.style.borderColor = 'rgba(139, 92, 246, 0.3)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 4px 20px rgba(139, 92, 246, 0.15)';
                    e.currentTarget.style.borderColor = 'rgba(139, 92, 246, 0.25)';
                  }}
                >
                  <h3 className="title mb-3" style={{ 
                    color: 'white',
                    fontSize: '1.3rem',
                    lineHeight: '1.3',
                    fontWeight: '400'
                  }}>
                    Nuestra Misión
                  </h3>
                  <p className="mb-0 flex-grow-1" style={{ 
                    color: 'rgba(255, 255, 255, 0.7)',
                    lineHeight: '1.6',
                    fontSize: '0.9rem'
                  }}>
                    Creemos que cada mujer puede resetear su futuro y crear  
                    <span className="text-white"> valor exponencial</span>.
                    Convertimos problemas en <span className="text-white">soluciones escalables</span> que transforman sectores completos.
                  </p>
                </div>
              </div>
            </div>

            {/* Features */}
            <div className="row">
              <div className="col-12">
                <div className="row g-4">
                  {[
                    { icon: 'fas fa-graduation-cap', title: 'EdTech', desc: 'Educación tecnológica innovadora' },
                    { icon: 'fas fa-capsules', title: 'HealthTech', desc: 'Soluciones de salud digital' },
                    { icon: 'fas fa-rocket', title: 'Impacto', desc: 'Proyectos con impacto real' },
                    { icon: 'far fa-gem', title: 'Mujeres', desc: 'Diseñado por y para mujeres' }
                  ].map((feature, index) => (
                    <div key={index} className="col-12 col-sm-6 col-lg-3 text-center">
                      <div 
                        className="p-3"
                        style={{
                          opacity: visibleFeatures.includes(index) ? 1 : 0,
                          transform: visibleFeatures.includes(index) ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.9)',
                          transition: `all 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${index * 0.1}s`
                        }}
                      >
                        <i className={`${feature.icon} fs-2 mb-3`} style={{ 
                          color: visibleFeatures.includes(index) 
                            ? '#8B5CF6'
                            : 'rgba(255, 255, 255, 0.3)',
                          transition: 'all 0.5s ease'
                        }}></i>
                        <h5 className="title text-white mb-2" style={{
                          fontSize: '1.1rem',
                          fontWeight: '400'
                        }}>{feature.title}</h5>
                        <p className="small mb-0" style={{ 
                          color: 'rgba(255, 255, 255, 0.7)',
                          fontSize: '0.85rem'
                        }}>{feature.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
