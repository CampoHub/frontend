import { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { ThemeContext } from '../context/ThemeContext';
import '../layouts/dashboard/dashboard.css';

const Sidebar = () => {
  const { user, logout } = useContext(AuthContext);
  const { darkMode, toggleTheme, sidebarOpen, toggleSidebar } = useContext(ThemeContext);
  const location = useLocation();

  const getInitials = (name) => {
    return name ? name.charAt(0).toUpperCase() : '?';
  };

  const isActive = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  return (
    <aside className={`sidebar ${!sidebarOpen ? 'collapsed' : ''}`}>
      <div className="sidebar-header">
        <Link to="/dashboard" className="sidebar-logo">
          {sidebarOpen ? (
            <>Campo<span>Hub</span></>
          ) : (
            <span>CH</span>
          )}
        </Link>
        <button className="toggle-sidebar" onClick={toggleSidebar}>
          <i className={`pi ${sidebarOpen ? 'pi-angle-left' : 'pi-angle-right'}`}></i>
        </button>
      </div>

      <div className="sidebar-menu">
        <div className="menu-category">Principal</div>
        <Link to="/dashboard" className={`menu-item ${isActive('/dashboard') ? 'active' : ''}`}>
          <i className="pi pi-home"></i>
          <span>Inicio</span>
        </Link>

        <div className="menu-category">Gestión</div>
        <Link to="/parcelas" className={`menu-item ${isActive('/parcelas') ? 'active' : ''}`}>
          <i className="pi pi-map"></i>
          <span>Parcelas</span>
        </Link>
        <Link to="/actividades" className={`menu-item ${isActive('/actividades') ? 'active' : ''}`}>
          <i className="pi pi-calendar"></i>
          <span>Actividades</span>
        </Link>
        <Link to="/trabajadores" className={`menu-item ${isActive('/trabajadores') ? 'active' : ''}`}>
          <i className="pi pi-users"></i>
          <span>Trabajadores</span>
        </Link>
        <Link to="/recursos" className={`menu-item ${isActive('/recursos') ? 'active' : ''}`}>
          <i className="pi pi-truck"></i>
          <span>Recursos</span>
        </Link>

        {/* Menu admin pa */}
        {user.role === "admin" && (
          <>
            <div className="menu-category">Admin</div>
            <Link to="/admin/usuarios" className="menu-item">
              <i className="pi pi-users"></i>
              <span>Gestión de Usuarios</span>
            </Link>
          </>
        )}

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
          {sidebarOpen && (
            <div>
              <div className="user-name">{user.name}</div>
              <div className="user-role">{user.role}</div>
            </div>
          )}
        </div>
        <button className="logout-btn" onClick={logout}>
          <i className="pi pi-sign-out"></i>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;