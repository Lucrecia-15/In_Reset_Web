import React, { useState, useEffect, useRef } from 'react';

const Pilares = () => {
  const [visibleItems, setVisibleItems] = useState([]);
  const [isInView, setIsInView] = useState(false);
  const sectionRef = useRef(null);

  const pilares = [
    {
      id: 1,
      number: "01",
      title: "Identificación de Nichos",
      description: "Detectamos problemas específicos y oportunidades únicas en el mercado a través de análisis profundo y metodologías especializadas.",
      color: "#442386"
    },
    {
      id: 2,
      number: "02", 
      title: "Soluciones a Medida",
      description: "Combinamos tecnología, educación y experiencias para crear soluciones innovadoras, efectivas y adaptadas a cada contexto específico.",
      color: "#442386"
    },
    {
      id: 3,
      number: "03",
      title: "Escalabilidad e Impacto",
      description: "Desarrollamos modelos de negocio sostenibles con impacto real, medible y escalable que generen valor a largo plazo.",
      color: "#442386"
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
  setIsInView(true);
  pilares.forEach((_, index) => {
    setTimeout(() => {
      setVisibleItems(prev => {
        if (!prev.includes(index)) {
          return [...prev, index];
        }
        return prev;
      });
    }, index * 800);
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

  // Efecto para animar la línea de tiempo sincronizada con las cards
  useEffect(() => {
    // La línea se ilumina según cuántos elementos están visibles
    // No necesitamos un efecto separado ya que se basa en visibleItems.length
  }, [visibleItems]);

  return (
    <section 
      ref={sectionRef}
      id="pilares" 
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
        <div className="row mb-0">
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
              Metodología de <span style={{ color: '#8B5CF6', fontWeight: '400' }}>Innovación</span>
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
              Creadores de soluciones transformadoras.
            </p>
          </div>
        </div>

        {/* Timeline */}
        <div className="row">
          <div className="col-12">
            <div className="position-relative">
              
              {/* Línea de luz horizontal */}
              <div 
                className="position-absolute d-none d-lg-block"
                style={{
                  top: '100px',
                  left: '15%',
                  right: '15%',
                  height: '2px',
                  background: 'rgba(255, 255, 255, 0.1)',
                  borderRadius: '1px'
                }}
              >
                {/* Progreso de la línea - efecto de luz sincronizado */}
                <div
                  className="position-absolute top-0 left-0"
                  style={{
                    height: '100%',
                    width: `${(visibleItems.length / pilares.length) * 100}%`,
                    background: 'linear-gradient(90deg, transparent 0%, #8B5CF6 20%, #D946EF 50%, #8B5CF6 80%, transparent 100%)',
                    borderRadius: '1px',
                    transition: 'width 0.8s ease-out',
                    boxShadow: '0 0 20px rgba(139, 92, 246, 0.8), 0 0 40px rgba(139, 92, 246, 0.4)',
                    filter: 'blur(0.5px)'
                  }}
                />
              </div>

              {/* Items de timeline horizontal */}
              <div className="row">
                {pilares.map((pilar, index) => (
                  <div
                    key={pilar.id}
                    className="col-12 col-lg-4 mb-4 mb-lg-5 d-flex"
                    style={{
                      opacity: visibleItems.includes(index) ? 1 : 0,
                      transform: visibleItems.includes(index) ? 'translateY(0) scale(1)' : 'translateY(30px) scale(0.95)',
                      transition: 'all 1s cubic-bezier(0.16, 1, 0.3, 1)'
                    }}
                  >
                    <div className="text-center position-relative w-100" style={{ paddingTop: '40px' }}>
                      
                      {/* Card compacta */}
                      <div
                        className="p-3 h-100 d-flex flex-column"
                        style={{
                          background: 'rgba(255, 255, 255, 0.03)',
                          borderRadius: '12px',
                          border: visibleItems.includes(index) 
                            ? '1px solid rgba(139, 92, 246, 0.25)'
                            : '1px solid rgba(255, 255, 255, 0.08)',
                          boxShadow: visibleItems.includes(index)
                            ? '0 4px 20px rgba(139, 92, 246, 0.15)'
                            : '0 2px 15px rgba(0, 0, 0, 0.2)',
                          transition: 'all 0.3s ease',
                          cursor: 'pointer',
                          minHeight: '200px'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = 'translateY(-3px)';
                          e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                          e.currentTarget.style.boxShadow = visibleItems.includes(index)
                            ? '0 8px 25px rgba(139, 92, 246, 0.25)'
                            : '0 6px 20px rgba(139, 92, 246, 0.1)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = 'translateY(0)';
                          e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)';
                          e.currentTarget.style.boxShadow = visibleItems.includes(index)
                            ? '0 4px 20px rgba(139, 92, 246, 0.15)'
                            : '0 2px 15px rgba(0, 0, 0, 0.2)';
                        }}
                      >
                        {/* Número */}
                        <div className="mb-2">
                          <span 
                            className="fw-light d-block"
                            style={{
                              fontSize: '1.8rem',
                              color: visibleItems.includes(index) 
                                ? '#8B5CF6'
                                : 'rgba(255, 255, 255, 0.3)',
                              transition: 'all 0.5s ease',
                              fontWeight: '200',
                              lineHeight: '1'
                            }}
                          >
                            {pilar.number}
                          </span>
                        </div>

                        {/* Contenido */}
                        <div className="flex-grow-1 d-flex flex-column">
                          <h3 
                            className="mb-3 mt-4 fw-normal"
                            style={{ 
                              color: 'white',
                              fontSize: '1.2rem',
                              lineHeight: '1.3',
                              fontWeight: '400'
                            }}
                          >
                            {pilar.title}
                          </h3>
                          
                          <p 
                            className="mb-0 fs-6 flex-grow-1"
                            style={{ 
                              color: 'rgba(255, 255, 255, 0.7)',
                              lineHeight: '1.5',
                              fontSize: '0.9rem'
                            }}
                          >
                            {pilar.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* CTA profesional 
        <div className="row mt-0 pt-0">
          <div className="col-12 col-lg-8 mx-auto text-center">
            <div 
              className="py-0"
              style={{
                borderTop: '1px solid rgba(255, 255, 255, 0.1)',
              }}
            >
                         
              
            </div>
          </div>
        </div> */}
      </div>

      <style jsx>{`
        /* Removemos la animación pulse ya que no tenemos círculos */
      `}</style>
    </section>
  );
};

export default Pilares;