import { useContext } from 'react';
import { PlotsContext } from '../../context/PlotsContext';
import './plots.css';

const PlotFilters = () => {
  const { filters, updateFilters } = useContext(PlotsContext);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    updateFilters({ [name]: value });
  };

  return (
    <div className="filters-container">
      <h3>
        <i className="pi pi-filter"></i>
        Filtrar Parcelas
      </h3>
      
      <div className="filters-form">
        <div className="filter-group">
          <label htmlFor="tipo_cultivo">
            <i className="pi pi-list" style={{ marginRight: '0.5rem' }}></i>
            Tipo de Cultivo
          </label>
          <select
            id="tipo_cultivo"
            name="tipo_cultivo"
            value={filters.tipo_cultivo}
            onChange={handleFilterChange}
          >
            <option value="">Todos los tipos</option>
            <option value="Cultivo">Cultivo</option>
            <option value="Ganadería">Ganadería</option>
            <option value="Mixto">Mixto</option>
            <option value="Otro">Otro</option>
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
            <option value="sembrado">Sembrado</option>
            <option value="cosechado">Cosechado</option>
            <option value="en preparación">En preparación</option>
          </select>
        </div>
      </div>

      {(filters.tipo_cultivo || filters.estado) && (
        <button
          onClick={() => updateFilters({ tipo_cultivo: '', estado: '' })}
          className="clear-filters-btn"
        >
          <i className="pi pi-filter-slash"></i>
          Limpiar Filtros
        </button>
      )}
    </div>
  );
};

export default PlotFilters;