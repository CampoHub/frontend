import { useContext } from 'react';
import { AssignmentsContext } from '../../context/AssignmentsContext';
import './assignments.css';

const AssignmentFilters = () => {
  const { filters, updateFilters } = useContext(AssignmentsContext);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    updateFilters({ [name]: value });
  };

  return (
    <div className="filters-container">
      <h3>
        <i className="pi pi-filter"></i>
        Filtrar Asignaciones
      </h3>

      <div className="filters-form">
        <div className="filter-group">
          <label htmlFor="activity">
            <i className="pi pi-list" style={{ marginRight: '0.5rem' }}></i>
            Actividad
          </label>
          <select
            id="activity"
            name="activity"
            value={filters.activity}
            onChange={handleFilterChange}
          >
            <option value="">Todas las actividades</option>
            <option value="Siembra">Siembra</option>
            <option value="Cosecha">Cosecha</option>
            <option value="Riego">Riego</option>
            <option value="Fumigación">Fumigación</option>
          </select>
        </div>

        <div className="filter-group">
          <label htmlFor="status">
            <i className="pi pi-flag" style={{ marginRight: '0.5rem' }}></i>
            Estado
          </label>
          <select
            id="status"
            name="status"
            value={filters.status}
            onChange={handleFilterChange}
          >
            <option value="">Todos los estados</option>
            <option value="pendiente">Pendiente</option>
            <option value="en_progreso">En Progreso</option>
            <option value="completada">Completada</option>
            <option value="cancelada">Cancelada</option>
          </select>
        </div>
      </div>

      {(filters.activity || filters.status) && (
        <button
          onClick={() => updateFilters({ activity: '', status: '' })}
          className="clear-filters-btn"
        >
          <i className="pi pi-filter-slash"></i>
          Limpiar Filtros
        </button>
      )}
    </div>
  );
};

export default AssignmentFilters;