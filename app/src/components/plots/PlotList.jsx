import { useContext } from 'react';
import { PlotsContext } from '../../context/PlotsContext';
import '../../layouts/dashboard/dashboard.css';

const PlotList = ({ plots, onSelectPlot, onEditPlot }) => {
  const { removePlot } = useContext(PlotsContext);

  const handleDelete = async (id, e) => {
    e.stopPropagation();
    if (window.confirm('¿Estás seguro de que quieres eliminar esta parcela?')) {
      try {
        await removePlot(id);
      } catch (error) {
        console.error('Error al eliminar la parcela:', error);
      }
    }
  };

  return (
    <div className="list-container" style={{ padding: '0', margin: '0' }}>
      {plots.length === 0 ? (
        <p className="empty-message" style={{ color: 'var(--text-light)', textAlign: 'center', margin: '2rem 0' }}>No hay parcelas registradas</p>
      ) : (
        <ul className="item-list" style={{ listStyle: 'none', padding: 0 }}>
          {plots.map(plot => (
            <li 
              key={plot.id} 
              className="item" 
              style={{ background: 'var(--card-background)', boxShadow: 'var(--box-shadow)', borderRadius: '8px', marginBottom: '1rem', padding: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', transition: 'var(--transition)' }}
              onClick={() => onSelectPlot(plot)}
            >
              <div className="item-details" style={{ flex: 1 }}>
                <h3 style={{ margin: 0, fontSize: '1.2rem', color: 'var(--text-primary)' }}>{plot.name}</h3>
                <p style={{ margin: '0.5rem 0', color: 'var(--text-light)' }}>Tamaño: {plot.size} hectáreas</p>
                <p style={{ margin: 0, color: 'var(--text-light)' }}>Tipo: {plot.type}</p>
              </div>
              <div className="item-actions" style={{ display: 'flex', gap: '0.5rem' }}>
                <button 
                  className="btn btn-edit" 
                  style={{ background: 'var(--primary-color)', color: '#fff', borderRadius: '6px', border: 'none', padding: '0.5rem 1rem' }}
                  onClick={(e) => {
                    e.stopPropagation();
                    onEditPlot(plot);
                  }}
                >
                  <i className="pi pi-pencil" style={{ marginRight: 4 }}></i> Editar
                </button>
                <button 
                  className="btn btn-delete" 
                  style={{ background: 'var(--danger-color)', color: '#fff', borderRadius: '6px', border: 'none', padding: '0.5rem 1rem' }}
                  onClick={(e) => handleDelete(plot.id, e)}
                >
                  <i className="pi pi-trash" style={{ marginRight: 4 }}></i> Eliminar
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PlotList;