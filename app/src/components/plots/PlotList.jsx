import { useContext, useState } from 'react';
import { PlotsContext } from '../../context/PlotsContext';
import { useAuth } from '../../context/AuthContext';
import { getPlotImage } from '../../utils/plotImages';
import '../../layouts/dashboard/dashboard.css';
import './plots.css';

const PlotList = ({ plots, onSelectPlot, onEditPlot }) => {
  const { removePlot } = useContext(PlotsContext);
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const isAdmin = user?.role === 'admin';
  const isGestor = user?.role === 'gestor';
  const canEdit = isAdmin || isGestor;

  const handleEdit = (plot, e) => {
    e.stopPropagation();
    onEditPlot(plot);
  };

  const handleDelete = async (id, e) => {
    e.stopPropagation();
    
    const plot = plots.find(p => p.id === id);
    const confirmMessage = `¿Estás seguro de que quieres eliminar la parcela "${plot.nombre}"?\n\nEsta acción no se puede deshacer.`;
    
    if (window.confirm(confirmMessage)) {
      setLoading(true);
      setError(null);
      
      try {
        await removePlot(id);
      } catch (error) {
        setError(error.message || 'Error al eliminar la parcela');
        console.error('Error al eliminar la parcela:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="plots-list-container">
      {plots.length === 0 ? (
        <p className="empty-message">No hay parcelas registradas</p>
      ) : (
        <div className="plots-grid">
          {plots.map(plot => (
            <div
              key={plot.id}
              className="plot-item"
              onClick={() => onSelectPlot(plot)}
            >
              <div className="plot-image-container">
                <img 
                  src={getPlotImage(plot.id)} 
                  alt={`Vista de la parcela ${plot.nombre}`}
                  className="plot-image"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = '/parcela1.png';
                  }}
                />
              </div>
              
              <div className="plot-content">
                <div className="plot-header">
                  <h3 className="plot-title">{plot.nombre}</h3>
                </div>
                <div className="plot-details">
                  <p>Tamaño: {plot.superficie} hectáreas</p>
                  <p>Tipo: {plot.tipo_cultivo}</p>
                  <p>Estado: {plot.estado}</p>
                </div>
                {canEdit && (
                  <div className="plot-actions">
                    <button
                      className="btn btn-edit"
                      onClick={(e) => handleEdit(plot, e)}
                      disabled={loading}
                    >
                      <i className="pi pi-pencil"></i>
                      <span>Editar</span>
                    </button>
                    {isAdmin && (
                      <button
                        className="btn btn-delete"
                        onClick={(e) => handleDelete(plot.id, e)}
                        disabled={loading}
                      >
                        <i className="pi pi-trash"></i>
                        <span>Eliminar</span>
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
      {error && <div className="error-message">{error}</div>}
    </div>
  );
};

export default PlotList;