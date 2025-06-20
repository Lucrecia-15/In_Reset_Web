import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin, faInstagram, faTiktok } from '@fortawesome/free-brands-svg-icons';
import InfoModal from '../pages/modalFooter'; // Asegurate que la ruta sea correcta

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({ title: '', content: '' });

const openModal = (type) => {
  if (type === 'privacidad') {
    setModalContent({
      title: 'Política de Privacidad',
      content: (
        <>
          <p>En <strong>IN RESET</strong>, la protección de tu privacidad es una prioridad. Esta Política de Privacidad explica cómo recopilamos, usamos, almacenamos y protegemos tus datos personales.</p>

          <h4>1. Datos que recopilamos</h4>
          <p>Recopilamos la información que tú nos proporcionas al registrarte, suscribirte a contenidos o utilizar nuestros servicios. Esto puede incluir:</p>
          <ul>
            <li>Nombre completo</li>
            <li>Correo electrónico</li>
            <li>Información de uso (navegación, clics, preferencias)</li>
            <li>Dirección IP y datos del dispositivo</li>
          </ul>

          <h4>2. Finalidades del tratamiento</h4>
          <p>Utilizamos tus datos para:</p>
          <ul>
            <li>Proporcionar nuestros servicios y personalizar tu experiencia</li>
            <li>Gestionar tu cuenta y responder a tus consultas</li>
            <li>Mejorar nuestros productos y servicios mediante análisis</li>
            <li>Enviar comunicaciones informativas o promocionales, solo si así lo autorizas</li>
          </ul>

          <h4>3. Conservación y seguridad</h4>
          <p>Conservamos tus datos únicamente el tiempo necesario para las finalidades descritas. Aplicamos medidas de seguridad técnicas y organizativas que protegen tu información frente a accesos no autorizados.</p>

          <h4>4. Derechos de los usuarios</h4>
          <p>Puedes ejercer tus derechos de acceso, rectificación, supresión, oposición, limitación y portabilidad contactándonos a través de <a href="mailto:hola@in-reset.com">hola@in-reset.com</a>.</p>

          <h4>5. Transferencias y cesiones</h4>
          <p>No cedemos tus datos a terceros sin tu consentimiento, excepto cuando sea necesario para la prestación del servicio o por obligación legal.</p>

          <h4>6. Cambios a esta política</h4>
          <p>Nos reservamos el derecho de modificar esta política para adaptarla a cambios legislativos o mejoras de nuestros servicios.</p>

          <p>Última actualización: Junio 2025</p>
        </>
      )
    });
  } else if (type === 'terminos') {
    setModalContent({
      title: 'Términos y Condiciones',
      content: (
        <>
          <p>Bienvenido/a a <strong>IN RESET</strong>. Al utilizar nuestros servicios, aceptas cumplir con los presentes Términos y Condiciones. Si no estás de acuerdo, te pedimos que no utilices nuestra plataforma.</p>

          <h4>1. Objeto</h4>
          <p>Estos términos regulan el acceso y uso de la plataforma IN RESET por parte de los usuarios. IN RESET se reserva el derecho a modificar los contenidos y servicios sin previo aviso.</p>

          <h4>2. Uso del sitio</h4>
          <ul>
            <li>No está permitido utilizar la plataforma con fines ilegales o no autorizados.</li>
            <li>Queda prohibida la reproducción, distribución o modificación no autorizada del contenido.</li>
            <li>Nos reservamos el derecho de suspender cuentas que infrinjan estos términos.</li>
          </ul>

          <h4>3. Propiedad intelectual</h4>
          <p>Todo el contenido (textos, imágenes, diseño, código, etc.) pertenece a IN RESET o cuenta con licencias correspondientes. No se permite su uso sin autorización previa.</p>

          <h4>4. Responsabilidad</h4>
          <p>IN RESET no se hace responsable de los daños o pérdidas derivados del uso del sitio o por interrupciones en el servicio. No garantizamos que la plataforma esté libre de errores o virus.</p>

          <h4>5. Modificaciones</h4>
          <p>Nos reservamos el derecho de actualizar estos Términos y Condiciones en cualquier momento. Los cambios serán efectivos desde su publicación en la web.</p>

          <h4>6. Legislación aplicable</h4>
          <p>Estos términos se rigen por la legislación española. Para cualquier controversia, las partes se someten a los juzgados de Valencia.</p>

          <p>Última actualización: Junio 2025</p>
        </>
      )
    });
  }
  setIsModalOpen(true);
};


  return (
    <>
      <footer className="bg-black text-white py-5 mt-auto border-top border-secondary border-opacity-25">
        <div className="container">
          <div className="row justify-content-start g-4">          

            {/* Columna de Soporte */}
            <div className="col-12 col-md-3 text-center text-md-start">
              <h5 className="fs-6 fw-bold mb-3 text-white">Soporte</h5>
              <ul className="list-unstyled mb-0">
                <li className="mb-2">
                  <button 
                    onClick={() => openModal('privacidad')}
                    className="btn btn-link text-white-50 text-decoration-none fs-7 p-0"
                  >
                    Política de Privacidad
                  </button>
                </li>
                <li className="mb-2">
                  <button 
                    onClick={() => openModal('terminos')}
                    className="btn btn-link text-white-50 text-decoration-none fs-7 p-0"
                  >
                    Términos y Servicios
                  </button>
                </li>
              </ul>
            </div>

            {/* Columna de Contacto */}
            <div className="col-12 col-md-3 text-center text-md-start">
              <h5 className="fs-6 fw-bold mb-3 text-white">Contacto</h5>
              <ul className="list-unstyled mb-0">
                <li className="mb-2">
                  <a href="mailto:soporte@in-reset.com" className="text-white-50 text-decoration-none fs-7">soporte@in-reset.com</a>
                </li>
                <li className="mb-2">
                  <a href="mailto:info@in-reset.com" className="text-white-50 text-decoration-none fs-7">info@in-reset.com</a>
                </li>
              </ul>
            </div>
          </div>

          <hr className="border-secondary border-opacity-25 my-4" />

          <div className="row justify-content-between align-items-center">
            <div className="col-12 col-md-auto text-center text-md-start">
              <p className="mb-2 mb-md-0 text-white-50 fs-7">&copy; IN RESET {currentYear}</p>
            </div>
            <div className="col-12 col-md-auto text-center text-md-end">
              <a href="https://www.linkedin.com/company/in-reset/" target="_blank" rel="noopener noreferrer" className="text-white text-decoration-none me-3">
                <FontAwesomeIcon icon={faLinkedin} className="fa-lg text-primary-hover" />
              </a>
              <a href="https://www.instagram.com/in__reset" target="_blank" rel="noopener noreferrer" className="text-white text-decoration-none me-3">
                <FontAwesomeIcon icon={faInstagram} className="fa-lg text-primary-hover" />
              </a>
              <a href="https://www.tiktok.com/@in_reset" target="_blank" rel="noopener noreferrer" className="text-white text-decoration-none">
                <FontAwesomeIcon icon={faTiktok} className="fa-lg text-primary-hover" />
              </a>
            </div>
          </div>
        </div>
      </footer>

      <InfoModal 
  isOpen={isModalOpen}
  onClose={() => setIsModalOpen(false)}
  title={modalContent.title}
  content={
    <div style={{ maxHeight: '70vh', paddingRight: '1rem' }}>
      {modalContent.content}
    </div>
  }
/>

    </>
  );
};
