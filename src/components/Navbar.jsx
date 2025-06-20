import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/img/logomorado.png";

export const Navbar = () => {
  return (
    <nav
      className="navbar navbar-expand-lg sticky-top px-0" // px-0 elimina padding horizontal de la nav
      style={{
        backgroundColor: 'rgba(10, 10, 10, 0.7)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid rgba(168, 85, 247, 0.2)',
        padding: '0.4rem 0', // Padding vertical, horizontal lo controla px-0
        width: '100%',
        boxSizing: 'border-box',
        minHeight: '60px'
      }}
    >
      <div
        className="container-fluid d-flex justify-content-between align-items-center" // container-fluid y d-flex justify-content-between para extremos
      // Eliminamos maxWidth aquí para que el container-fluid ocupe todo el ancho
      // Si necesitas un ancho máximo, puedes volver a agregarlo y centrar la navbar en un div padre.
      >
        {/* Logo de la marca */}
        <a
          href="#hero"
          className="navbar-brand py-0 me-auto ps-3"
          style={{
            height: '50px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'start',
            cursor: 'pointer'
          }}
        >
          <img
            src={logo}
            alt="Logo"
            style={{
              width: '150px',
              height: 'auto',
              maxHeight: '100%',
              display: 'block'
            }}
          />
        </a>


        {/* Botón del menú hamburguesa para responsive */}
        <button
          className="navbar-toggler border-0 me-3" // me-3 para un poco de margen a la derecha del botón
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"
            style={{
              filter: 'invert(1) brightness(2)'
            }}>
          </span>
        </button>

        {/* Menú de navegación */}
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav ms-auto pe-3">
            <li className="nav-item">
              <a className="nav-link text-white mx-2 py-1" href="#nosotros"
                style={{
                  transition: 'color 0.3s ease',
                  fontSize: '1.05rem',
                  lineHeight: '1.2'
                }}
                onMouseOver={(e) => e.target.style.color = '#a855f7'}
                onMouseOut={(e) => e.target.style.color = 'white'}>
                Sobre Nosotros
              </a>
            </li>
            {/*<li className="nav-item">
              <a className="nav-link text-white mx-2 py-1" href="#pilares"
                style={{
                  transition: 'color 0.3s ease',
                  fontSize: '1.05rem',
                  lineHeight: '1.2'
                }}
                onMouseOver={(e) => e.target.style.color = '#a855f7'}
                onMouseOut={(e) => e.target.style.color = 'white'}>
                Pilares
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-white mx-2 py-1" href="#proyectos"
                style={{
                  transition: 'color 0.3s ease',
                  fontSize: '1.05rem',
                  lineHeight: '1.2'
                }}
                onMouseOver={(e) => e.target.style.color = '#06b6d4'}
                onMouseOut={(e) => e.target.style.color = 'white'}>
                Proyectos
              </a>
            </li>*/}
            <li className="nav-item">
              <a className="nav-link text-white mx-2 py-1" href="#contacto"
                style={{
                  transition: 'color 0.3s ease',
                  fontSize: '1.05rem',
                  lineHeight: '1.2'
                }}
                onMouseOver={(e) => e.target.style.color = '#06b6d4'}
                onMouseOut={(e) => e.target.style.color = 'white'}>
                Contacto
              </a>
            </li>            
          </ul>
        </div>
      </div>
    </nav>
  );
};