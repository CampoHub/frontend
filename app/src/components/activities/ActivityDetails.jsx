import React, { useContext } from 'react';
import { PlotsContext } from '../../context/PlotsContext';

const ActivityDetails = ({ activity, onEdit }) => {
  const { plots } = useContext(PlotsContext);

  if (!activity) {
    return <div>No hay actividad seleccionada.</div>;
  }

  const plot = plots.find(p => p.id === activity.id_parcela);

  const getStatusColor = (estado) => {
    const colors = {
      'pendiente': '#FFA500',
      'en progreso': '#3498DB',
      'completada': '#2ECC71'
    };
    return colors[estado] || '#666';
  };

  return (
    <div className="details-container">
      <h3>{activity.nombre}</h3>
      <div className="details-content">
        <p><strong>Tipo:</strong> {activity.tipo}</p>
        <p><strong>Parcela:</strong> {plot?.nombre || 'No especificada'}</p>
        <p><strong>Fecha de inicio:</strong> {new Date(activity.fecha_inicio).toLocaleDateString()}</p>
        {activity.fecha_fin && (
          <p><strong>Fecha de fin:</strong> {new Date(activity.fecha_fin).toLocaleDateString()}</p>
        )}
        <p>
          <strong>Estado:</strong> 
          <span style={{ color: getStatusColor(activity.estado) }}>
            {activity.estado}
          </span>
        </p>
      </div>
      <button className="btn btn-edit" onClick={onEdit}>
        <i className="pi pi-pencil"></i> Editar
      </button>
    </div>
  );
};

export default ActivityDetails;