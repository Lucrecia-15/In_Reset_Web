// Hero.jsx
import React, { useState, useEffect } from 'react';
import './hero.css'; // Importar los estilos
import Hyperspeed from "./Hyperspeed";

const Hero = () => {
  const [visibleWords, setVisibleWords] = useState([]);
  const [showDescription, setShowDescription] = useState(false);

  const words = ['Educación', 'Tecnología', 'Experiencias'];
  
  const awards = [
    'Startup del Año 2024',
    'Innovation Award', 
    'Best EdTech Platform',
    'Top 10 HealthTech',
    'Female Leadership Prize',
    'Tech Excellence Award',
    'Startup del Año 2024',
    'Innovation Award',
    'Best EdTech Platform', 
    'Top 10 HealthTech',
    'Female Leadership Prize',
    'Tech Excellence Award'
  ];

  useEffect(() => {
      // Mostrar "Educación"
      setTimeout(() => {
        setVisibleWords([0]);
      }, 0);

      // Mostrar "Tecnología" y el párrafo de la derecha al mismo tiempo
      setTimeout(() => {
        setVisibleWords([0, 1]);
        setShowDescription(true);
      }, 600);

      // Mostrar "Experiencias"
      setTimeout(() => {
        setVisibleWords([0, 1, 2]);
      }, 1200);
      },[]);

  return (
    <section id="hero" className="hero-section">
      <div className="hero-content">
        <div className="container-fluid px-2 px-md-3">
          <div className="row align-items-center justify-content-between">
          <Hyperspeed
          effectOptions={{
            onSpeedUp: () => console.log("Speed up!"),
            onSlowDown: () => console.log("Slow down!"),
            distortion: "turbulentDistortion",
            length: 350,                      // Un poco más largo (de 300 a 350)
            roadWidth: 9,                     // Ligeramente más ancho (de 8 a 9)
            lanesPerRoad: 4,                  // Un carril más (de 3 a 4)
            islandWidth: 2,
            fov: 90,
            fovSpeedUp: 110,                  // Un poco más de efecto (de 120 a 130)
            speedUp: 1.2,                     // Ligeramente más rápido (de 1 a 1.2)
            carLightsFade: 0.4,
            totalSideLightSticks: 15,         // Solo 2 más (de 10 a 12)
            lightPairsPerRoadWay: 20,         // Solo 3 más (de 15 a 18)
            shoulderLinesWidthPercentage: 0.05,
            brokenLinesWidthPercentage: 0.1,
            brokenLinesLengthPercentage: 0.5,
            lightStickWidth: [0.12, 0.5],
            lightStickHeight: [1.3, 1.7],
            movingAwaySpeed: [15, 25],        // Un poco más rápido
            movingCloserSpeed: [-40, -60],    // Un poco más rápido
            carLightsLength: [30, 50],        // Luces un poco más largas
            carLightsRadius: [0.05, 0.16],    // Ligeramente más grandes
            carWidthPercentage: [0.3, 0.5],
            carShiftX: [-0.8, 0.8],
            carFloorSeparation: [0, 5],
            colors: {
              roadColor: 0x0b001f,
              islandColor: 0x000000,
              background: 0x000000,
              shoulderLines: 0xffffff,
              brokenLines: 0xffffff,
              leftCars: [
                0x6e409b,
                0x5c3685,
                0x472b6a,
                0xb595e0,
                0xa472d9
              ],
              rightCars: [
                0x5a3b83,
                0x7a4fa7,
                0x68408f,
                0xceb1f1,
                0xbc8fe6
              ],
              sticks: 0x00000,
            },
          }}
          />

          {/* Títulos a la izquierda */}
          <div className="col-12 col-lg-3 text-start text-center text-lg-start px-3 px-md-4" 
               style={{ marginTop: '30px' }}>
            <div>
              {words.map((word, index) => (
                <h1
                  key={word}
                  className={`mb-2 mb-md-3`}
                  style={{
                    fontSize: 'clamp(2rem, 8vw, 5rem)',
                    fontWeight: '600',
                    letterSpacing: '-0.03em',
                    color: 'white',
                    textShadow: '0 4px 12px rgba(0,0,0,0.4)',
                    opacity: visibleWords.includes(index) ? 1 : 0,
                    transform: visibleWords.includes(index)
                      ? 'translateX(0) scale(1)'
                      : 'translateX(-50px) scale(0.8)',
                    transition: 'all 1s cubic-bezier(0.16, 1, 0.3, 1)',
                    margin: '0 0 0.5rem 0',
                    lineHeight: '0.85',
                    display: 'block'
                  }}
                >
                  {word}
                </h1>
              ))}
            </div>
          </div>

          {/* Espacio central para objeto 3D */}
          <div className="col-12 col-lg-6 d-flex justify-content-center">
            <div className="hero-3d-placeholder"></div>
          </div>

          {/* Descripción a la derecha */}
          <div className="col-12 col-lg-3 text-end text-center text-lg-end px-3 px-md-4 description-container" 
               style={{ marginTop: '30px' }}>
            <div className={`hero-description mx-auto mx-lg-0 ms-lg-auto me-lg-0 ${
              showDescription ? 'visible' : ''
            }`}>
              <p className="hero-description-text text-justify text-lg-end px-lg-0">
                Creamos{' '}
                <span className="hero-description-highlight">
                   ecosistemas 
                </span>{' '}
                inmersivos donde las mujeres descubren su poder transformador. {' '}
                <span className="hero-description-highlight">
                  Innovación Tech {' '}
                </span>
                que convierte el aprendizaje en acción real
              </p>
            </div>
          </div>

        </div>
      </div>
      </div>

{/* Carousel infinito de premios - visible y animado desde el principio */}
      <div className="awards-carousel visible">
        <div className="awards-carousel-container">
          <div className="awards-scroll animated">
            {awards.map((award, index) => (
              <div key={index} className="d-flex align-items-center">
                <span className="award-item">
                  {award}
                </span>
                {index < awards.length - 1 && (
                  <div className="award-separator" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;