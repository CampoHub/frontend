import { useState } from 'react'
import './App.css'

function App() {
  const [showMore, setShowMore] = useState(false)

  return (
    <div className="landing-page">
      <header className="header">
        <div className="logo-container">
          <h1 className="logo">Campo<span>Hub</span></h1>
        </div>
        <nav className="nav">
          <ul>
            <li><a href="#features">Características</a></li>
            <li><a href="#benefits">Beneficios</a></li>
            <li><a href="#contact">Contacto</a></li>
          </ul>
        </nav>
        <div className="auth-buttons">
          <button className="btn login-btn">Iniciar Sesión</button>
          <button className="btn signup-btn">Registrarse</button>
        </div>
      </header>

      <section className="hero">
        <div className="hero-content">
          <h2>Sistema Integral de Gestión para su Campo</h2>
          <p>Optimice sus operaciones agrícolas con nuestra plataforma completa de administración de recursos, actividades y personal.</p>
          <button className="btn cta-btn">Solicitar Demostración</button>
        </div>
        <div className="hero-image">
          <img src="/images/farm-management.jpg" alt="Gestión de campo" />
        </div>
      </section>

      <section id="features" className="features">
        <h2>Características Principales</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">🌱</div>
            <h3>Gestión de Parcelas</h3>
            <p>Organice y monitoree todas sus parcelas con información detallada sobre cultivos, estado y rendimiento.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📋</div>
            <h3>Seguimiento de Actividades</h3>
            <p>Planifique, asigne y supervise todas las actividades del campo en un solo lugar.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">👨‍🌾</div>
            <h3>Gestión de Trabajadores</h3>
            <p>Administre su personal, asigne tareas y controle las horas trabajadas de manera eficiente.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🚜</div>
            <h3>Control de Recursos</h3>
            <p>Inventario completo de maquinaria, herramientas e insumos para optimizar su uso.</p>
          </div>
        </div>
      </section>

      <section id="benefits" className="benefits">
        <h2>Beneficios</h2>
        <div className="benefits-container">
          <div className="benefit">
            <h3>Aumento de Productividad</h3>
            <p>Optimice sus operaciones y mejore la eficiencia con nuestra plataforma intuitiva.</p>
          </div>
          <div className="benefit">
            <h3>Reducción de Costos</h3>
            <p>Mejor gestión de recursos y eliminación de desperdicio de tiempo y materiales.</p>
          </div>
          <div className="benefit">
            <h3>Toma de Decisiones Informadas</h3>
            <p>Acceda a datos precisos y actualizados para tomar las mejores decisiones para su campo.</p>
          </div>
        </div>
        {showMore && (
          <div className="additional-benefits">
            <div className="benefit">
              <h3>Trazabilidad Completa</h3>
              <p>Seguimiento detallado de todas las actividades y recursos utilizados en cada parcela.</p>
            </div>
            <div className="benefit">
              <h3>Acceso Desde Cualquier Lugar</h3>
              <p>Sistema basado en la nube accesible desde computadoras, tablets y smartphones.</p>
            </div>
          </div>
        )}
        <button 
          className="btn show-more-btn" 
          onClick={() => setShowMore(!showMore)}
        >
          {showMore ? 'Ver menos' : 'Ver más beneficios'}
        </button>
      </section>

      <section id="testimonials" className="testimonials">
        <h2>Lo que dicen nuestros clientes</h2>
        <div className="testimonial-slider">
          <div className="testimonial">
            <p>"CampoHub ha transformado completamente la manera en que administramos nuestra finca. La organización y eficiencia han mejorado notablemente."</p>
            <div className="testimonial-author">
              <img src="/images/testimonial-1.jpg" alt="Cliente" />
              <div>
                <h4>Carlos Rodríguez</h4>
                <p>Productor Agrícola, Mendoza</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="contact">
        <h2>¿Listo para optimizar la gestión de su campo?</h2>
        <p>Contáctenos hoy mismo para una demostración personalizada.</p>
        <div className="contact-form">
          <div className="form-group">
            <input type="text" placeholder="Nombre" />
            <input type="email" placeholder="Correo electrónico" />
          </div>
          <div className="form-group">
            <input type="text" placeholder="Teléfono" />
            <select>
              <option value="" disabled selected>Tamaño del campo</option>
              <option value="small">Pequeño (menos de 50 hectáreas)</option>
              <option value="medium">Mediano (50-200 hectáreas)</option>
              <option value="large">Grande (más de 200 hectáreas)</option>
            </select>
          </div>
          <textarea placeholder="Mensaje"></textarea>
          <button className="btn submit-btn">Enviar consulta</button>
        </div>
      </section>

      <footer className="footer">
        <div className="footer-content">
          <div className="footer-logo">
            <h2>Campo<span>Hub</span></h2>
            <p>Sistema integral de gestión para el campo</p>
          </div>
          <div className="footer-links">
            <h3>Enlaces rápidos</h3>
            <ul>
              <li><a href="#features">Características</a></li>
              <li><a href="#benefits">Beneficios</a></li>
              <li><a href="#contact">Contacto</a></li>
              <li><a href="#">Términos y condiciones</a></li>
              <li><a href="#">Política de privacidad</a></li>
            </ul>
          </div>
          <div className="footer-contact">
            <h3>Contacto</h3>
            <p>Email: info@campohub.com</p>
            <p>Teléfono: +54 9 11 1234-5678</p>
            <div className="social-icons">
              <a href="#" className="social-icon">📱</a>
              <a href="#" className="social-icon">📘</a>
              <a href="#" className="social-icon">📸</a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2025 CampoHub. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  )
}

export default App
