import { useContext } from 'react';
import { ActivitiesContext } from '../../context/ActivitiesContext';

const ActivityList = ({ activities, onSelectActivity, onEditActivity }) => {
  const { removeActivity } = useContext(ActivitiesContext);

  const handleDelete = async (id, e) => {
    e.stopPropagation();
    if (window.confirm('¿Estás seguro de que quieres eliminar esta actividad?')) {
      try {
        await removeActivity(id);
      } catch (error) {
        console.error('Error al eliminar la actividad:', error);
      }
    }
  };

  const getStatusColor = (estado) => {
    const colors = {
      'pendiente': '#FFA500',
      'en progreso': '#3498DB',
      'completada': '#2ECC71'
    };
    return colors[estado] || '#666';
  };

  return (
    <div className="list-container">
      {activities.length === 0 ? (
        <p className="empty-message">No hay actividades registradas</p>
      ) : (
        <ul className="item-list">
          {activities.map(activity => (
            <li
              key={activity.id}
              className="item"
              onClick={() => onSelectActivity(activity)}
            >
              <div className="item-details">
                <h3>{activity.nombre}</h3>
                <p>Tipo: {activity.tipo}</p>
                <p>Fecha inicio: {new Date(activity.fecha_inicio).toLocaleDateString()}</p>
                <p style={{ color: getStatusColor(activity.estado) }}>
                  Estado: {activity.estado}
                </p>
              </div>
              <div className="item-actions">
                <button
                  className="btn btn-edit"
                  onClick={(e) => {
                    e.stopPropagation();
                    onEditActivity(activity);
                  }}
                >
                  <i className="pi pi-pencil"></i> Editar
                </button>
                <button
                  className="btn btn-delete"
                  onClick={(e) => handleDelete(activity.id, e)}
                >
                  <i className="pi pi-trash"></i> Eliminar
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ActivityList;