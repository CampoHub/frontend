import { useContext } from 'react';
import { ActivitiesContext } from '../../context/ActivitiesContext';
import './activities.css';

const ActivityFilters = () => {
  const { filters, updateFilters } = useContext(ActivitiesContext);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    updateFilters({ [name]: value });
  };

  return (
    <div className="filters-container">
      <h3>
        <i className="pi pi-filter"></i>
        Filtrar Actividades
      </h3>
      
      <div className="filters-form">
        <div className="filter-group">
          <label htmlFor="tipo">
            <i className="pi pi-list" style={{ marginRight: '0.5rem' }}></i>
            Tipo de Actividad
          </label>
          <select
            id="tipo"
            name="tipo"
            value={filters.tipo}
            onChange={handleFilterChange}
          >
            <option value="">Todos los tipos</option>
            <option value="Siembra">Siembra</option>
            <option value="Cosecha">Cosecha</option>
            <option value="Riego">Riego</option>
            <option value="Fumigación">Fumigación</option>
          </select>
        </div>

        <div className="filter-group">
          <label htmlFor="estado">
            <i className="pi pi-flag" style={{ marginRight: '0.5rem' }}></i>
            Estado
          </label>
          <select
            id="estado"
            name="estado"
            value={filters.estado}
            onChange={handleFilterChange}
          >
            <option value="">Todos los estados</option>
            <option value="pendiente">Pendiente</option>
            <option value="en progreso">En progreso</option>
            <option value="completada">Completada</option>
          </select>
        </div>
      </div>

      {(filters.tipo || filters.estado) && (
        <button
          onClick={() => updateFilters({ tipo: '', estado: '' })}
          className="clear-filters-btn"
        >
          <i className="pi pi-filter-slash"></i>
          Limpiar Filtros
        </button>
      )}
    </div>
  );
};

export default ActivityFilters;