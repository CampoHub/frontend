import React, { useState } from 'react';
import { useAssignments } from '../../context/hooks/useAssignments';
import '../common/Modal.css';

const AssignWorkerModal = ({ isOpen, onClose, worker, activities }) => {
  const [selectedActivity, setSelectedActivity] = useState('');
  const [rol, setRol] = useState('operador');
  const { assignWorker, loading, error } = useAssignments();

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await assignWorker(selectedActivity, {
        worker_id: worker.id,
        rol_en_actividad: rol
      });
      onClose();
    } catch (err) {
      console.error('Error al asignar trabajador:', err);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Asignar a {worker.nombre} {worker.apellido}</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="activity">Actividad:</label>
            <select
              id="activity"
              value={selectedActivity}
              onChange={(e) => setSelectedActivity(e.target.value)}
              required
            >
              <option value="">Seleccione una actividad</option>
              {activities.map(activity => (
                <option key={activity.id} value={activity.id}>
                  {activity.nombre} - {activity.tipo}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="rol">Rol en la actividad:</label>
            <select
              id="rol"
              value={rol}
              onChange={(e) => setRol(e.target.value)}
              required
            >
              <option value="operador">Operador</option>
              <option value="supervisor">Supervisor</option>
              <option value="ayudante">Ayudante</option>
            </select>
          </div>

          {error && <div className="error-message">{error}</div>}

          <div className="modal-actions">
            <button type="button" onClick={onClose} disabled={loading}>
              Cancelar
            </button>
            <button type="submit" className="btn-primary" disabled={loading}>
              {loading ? 'Asignando...' : 'Asignar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AssignWorkerModal;