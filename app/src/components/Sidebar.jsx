import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { ThemeContext } from '../context/ThemeContext';
import '../layouts/dashboard/dashboard.css';

const Sidebar = ({ sidebarOpen, toggleSidebar }) => {
  const { user, logout } = useContext(AuthContext);
  const { darkMode, toggleTheme } = useContext(ThemeContext);

  // Función para obtener la primera letra del nombre
  const getInitials = (name) => {
    return name ? name.charAt(0).toUpperCase() : '?';
  };

  return (
    <aside className={`sidebar ${sidebarOpen ? '' : 'open'}`}>
      <div className="sidebar-header">
        <Link to="/dashboard" className="sidebar-logo">
          Campo<span>Hub</span>
        </Link>
        <button className="toggle-sidebar" onClick={toggleSidebar}>
          <i className="pi pi-bars"></i>
        </button>
      </div>

      <div className="sidebar-menu">
        <div className="menu-category">Principal</div>
        <Link to="/dashboard" className="menu-item active">
          <i className="pi pi-home"></i>
          <span>Inicio</span>
        </Link>

        <div className="menu-category">Gestión</div>
        <Link to="/parcelas" className="menu-item">
          <i className="pi pi-map"></i>
          <span>Parcelas</span>
        </Link>
        <Link to="/actividades" className="menu-item">
          <i className="pi pi-calendar"></i>
          <span>Actividades</span>
        </Link>
        <Link to="/trabajadores" className="menu-item">
          <i className="pi pi-users"></i>
          <span>Trabajadores</span>
        </Link>
        <Link to="/recursos" className="menu-item">
          <i className="pi pi-truck"></i>
          <span>Recursos</span>
        </Link>

        <div className="menu-category">Configuración</div>
        <Link to="/perfil" className="menu-item">
          <i className="pi pi-user-edit"></i>
          <span>Mi Perfil</span>
        </Link>
        <Link to="/configuracion" className="menu-item">
          <i className="pi pi-cog"></i>
          <span>Configuración</span>
        </Link>
        <Link
          className="menu-item"
          onClick={toggleTheme}
          tooltip={darkMode ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
          aria-label="Cambiar tema"
        >
          <i className={darkMode ? 'pi pi-sun' : 'pi pi-moon'}></i>
          <span> Tema</span>
        </Link>
      </div>

      <div className="sidebar-footer">
        <div className="user-info">
          <div className="user-avatar">
            {getInitials(user.name)}
          </div>
          <div>
            <div className="user-name">{user.name}</div>
            <div className="user-role">{user.role}</div>
          </div>
        </div>
        <button className="logout-btn" onClick={logout}>
          <i className="pi pi-sign-out"></i>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;