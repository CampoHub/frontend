import { useState, useContext, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { ThemeContext } from '../../context/ThemeContext';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import Sidebar from '../../components/Sidebar';
import './dashboard.css';

const Dashboard = () => {
  const { user, logout } = useContext(AuthContext);
  const { darkMode, toggleTheme } = useContext(ThemeContext);
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [greeting, setGreeting] = useState('');

  // Determinar el saludo según la hora del día
  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Buenos días');
    else if (hour < 18) setGreeting('Buenas tardes');
    else setGreeting('Buenas noches');
  }, []);

  // Verificar si el usuario está autenticado
  useEffect(() => {
    if (!user) {
      navigate('/inicio-sesion');
    }
  }, [user, navigate]);

  // Función para obtener la primera letra del nombre
  const getInitials = (name) => {
    return name ? name.charAt(0).toUpperCase() : '?';
  };

  // Función para alternar la visibilidad del sidebar
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Si no hay usuario autenticado, no mostrar el dashboard
  if (!user) return null;

  return (
    <div className="dashboard-container">
    <Sidebar sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      <main className="main-content">
        <div className="content-header">
          <div className="content-title">
            <h1>{greeting}, {user.name}</h1>
            <p>Bienvenido a tu panel de control</p>
          </div>
        </div>

        <div className="dashboard-widgets">
          <div className="widget">
            <div className="widget-header">
              <span className="widget-title">Parcelas Activas</span>
              <div className="widget-icon">
                <i className="pi pi-map"></i>
              </div>
            </div>
            <div className="widget-content">
              <div className="widget-value">8</div>
              <div className="widget-label">Parcelas en producción</div>
            </div>
          </div>

          <div className="widget">
            <div className="widget-header">
              <span className="widget-title">Actividades Pendientes</span>
              <div className="widget-icon">
                <i className="pi pi-calendar"></i>
              </div>
            </div>
            <div className="widget-content">
              <div className="widget-value">12</div>
              <div className="widget-label">Para esta semana</div>
            </div>
          </div>

          <div className="widget">
            <div className="widget-header">
              <span className="widget-title">Trabajadores</span>
              <div className="widget-icon">
                <i className="pi pi-users"></i>
              </div>
            </div>
            <div className="widget-content">
              <div className="widget-value">24</div>
              <div className="widget-label">Registrados en el sistema</div>
            </div>
          </div>

          <div className="widget">
            <div className="widget-header">
              <span className="widget-title">Recursos Disponibles</span>
              <div className="widget-icon">
                <i className="pi pi-truck"></i>
              </div>
            </div>
            <div className="widget-content">
              <div className="widget-value">15</div>
              <div className="widget-label">Maquinarias y herramientas</div>
            </div>
          </div>
        </div>

        <h2>Gestione su campo</h2>
        <p style={{ marginBottom: '20px' }}>Acceda rápidamente a los módulos principales del sistema</p>

        <div className="entity-cards">
          <Card className="entity-card">
            <div className="entity-card-header">
              <h3 className="entity-card-title">Parcelas</h3>
              <i className="entity-card-icon pi pi-map"></i>
            </div>
            <div className="entity-card-body">
              <div className="entity-card-content">
                <p className="entity-card-description">
                  Gestione sus parcelas, registre cultivos, monitoree rendimientos y planifique rotaciones.
                </p>
              </div>
              <div className="entity-card-footer">
                <div className="card-stat">
                  <div className="stat-value">8</div>
                  <div className="stat-label">Total</div>
                </div>
                <div className="card-stat">
                  <div className="stat-value">6</div>
                  <div className="stat-label">Activas</div>
                </div>
                <div className="card-stat">
                  <div className="stat-value">2</div>
                  <div className="stat-label">En descanso</div>
                </div>
              </div>
              <div className="entity-card-actions">
                <Link to="/parcelas">
                  <Button label="Gestionar Parcelas" icon="pi pi-arrow-right" className="p-button-primary" />
                </Link>
              </div>
            </div>
          </Card>

          <Card className="entity-card">
            <div className="entity-card-header" style={{ backgroundColor: '#F39C12' }}>
              <h3 className="entity-card-title">Actividades</h3>
              <i className="entity-card-icon pi pi-calendar"></i>
            </div>
            <div className="entity-card-body">
              <div className="entity-card-content">
                <p className="entity-card-description">
                  Planifique, asigne y supervise todas las actividades del campo en un calendario interactivo.
                </p>
              </div>
              <div className="entity-card-footer">
                <div className="card-stat">
                  <div className="stat-value">12</div>
                  <div className="stat-label">Pendientes</div>
                </div>
                <div className="card-stat">
                  <div className="stat-value">8</div>
                  <div className="stat-label">En proceso</div>
                </div>
                <div className="card-stat">
                  <div className="stat-value">5</div>
                  <div className="stat-label">Completadas</div>
                </div>
              </div>
              <div className="entity-card-actions">
                <Link to="/actividades">
                  <Button label="Ver Actividades" icon="pi pi-arrow-right" className="p-button-primary" style={{ backgroundColor: '#F39C12', borderColor: '#F39C12' }} />
                </Link>
              </div>
            </div>
          </Card>

          <Card className="entity-card">
            <div className="entity-card-header" style={{ backgroundColor: '#3498DB' }}>
              <h3 className="entity-card-title">Trabajadores</h3>
              <i className="entity-card-icon pi pi-users"></i>
            </div>
            <div className="entity-card-body">
              <div className="entity-card-content">
                <p className="entity-card-description">
                  Administre su personal, registre información de contacto y asigne tareas de manera eficiente.
                </p>
              </div>
              <div className="entity-card-footer">
                <div className="card-stat">
                  <div className="stat-value">24</div>
                  <div className="stat-label">Total</div>
                </div>
                <div className="card-stat">
                  <div className="stat-value">18</div>
                  <div className="stat-label">Activos</div>
                </div>
                <div className="card-stat">
                  <div className="stat-value">6</div>
                  <div className="stat-label">Temporales</div>
                </div>
              </div>
              <div className="entity-card-actions">
                <Link to="/trabajadores">
                  <Button label="Gestionar Trabajadores" icon="pi pi-arrow-right" className="p-button-primary" style={{ backgroundColor: '#3498DB', borderColor: '#3498DB' }} />
                </Link>
              </div>
            </div>
          </Card>

          <Card className="entity-card">
            <div className="entity-card-header" style={{ backgroundColor: '#9B59B6' }}>
              <h3 className="entity-card-title">Recursos</h3>
              <i className="entity-card-icon pi pi-truck"></i>
            </div>
            <div className="entity-card-body">
              <div className="entity-card-content">
                <p className="entity-card-description">
                  Inventario de maquinaria, herramientas e insumos para optimizar su uso y mantenimiento.
                </p>
              </div>
              <div className="entity-card-footer">
                <div className="card-stat">
                  <div className="stat-value">15</div>
                  <div className="stat-label">Maquinarias</div>
                </div>
                <div className="card-stat">
                  <div className="stat-value">30</div>
                  <div className="stat-label">Herramientas</div>
                </div>
                <div className="card-stat">
                  <div className="stat-value">8</div>
                  <div className="stat-label">Insumos</div>
                </div>
              </div>
              <div className="entity-card-actions">
                <Link to="/recursos">
                  <Button label="Ver Recursos" icon="pi pi-arrow-right" className="p-button-primary" style={{ backgroundColor: '#9B59B6', borderColor: '#9B59B6' }} />
                </Link>
              </div>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;