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
    <div className="list-container">
      {plots.length === 0 ? (
        <p className="empty-message">No hay parcelas registradas</p>
      ) : (
        <ul className="item-list">
          {plots.map(plot => (
            <li 
              key={plot.id} 
              className="item" 
              onClick={() => onSelectPlot(plot)}
            >
              <div className="item-details">
                <h3>{plot.name}</h3>
                <p>Tamaño: {plot.size} hectáreas</p>
                <p>Tipo: {plot.type}</p>
              </div>
              <div className="item-actions">
                <button 
                  className="btn btn-edit" 
                  onClick={(e) => {
                    e.stopPropagation();
                    onEditPlot(plot);
                  }}
                >
                  Editar
                </button>
                <button 
                  className="btn btn-delete" 
                  onClick={(e) => handleDelete(plot.id, e)}
                >
                  Eliminar
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