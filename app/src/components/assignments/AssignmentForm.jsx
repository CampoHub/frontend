import { useEffect, useState } from 'react';
import { Button } from 'primereact/button';
import { Calendar } from 'primereact/calendar';
import { Dropdown } from 'primereact/dropdown';
import { useAssignments } from '../../context/hooks/useAssignments';
import { useActivities } from '../../context/hooks/useActivities';
import { useWorkers } from '../../context/WorkersContext';
import './assignments.css';

const AssignmentForm = ({ assignment, onClose }) => {
  const { createAssignment } = useAssignments();
  const { activities } = useActivities();
  const { workers } = useWorkers();

  const [formData, setFormData] = useState({
    activityId: '',
    workerId: '',
    startDate: null,
    endDate: null,
    status: 'pendiente'
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (assignment) {
      setFormData({
        activityId: assignment.activityId,
        workerId: assignment.workerId,
        startDate: new Date(assignment.startDate),
        endDate: new Date(assignment.endDate),
        status: assignment.status
      });
    }
  }, [assignment]);

  const statusOptions = [
    { label: 'Pendiente', value: 'pendiente' },
    { label: 'En Progreso', value: 'en_progreso' },
    { label: 'Completada', value: 'completada' },
    { label: 'Cancelada', value: 'cancelada' }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await createAssignment({
        activity_id: formData.activityId,
        worker_id: formData.workerId,
        start_date: formData.startDate,
        end_date: formData.endDate,
        status: formData.status
      });

      onClose();
    } catch (err) {
      setError(err.message || 'Error al guardar la asignación');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <div className="form-group">
        <label htmlFor="activity">Actividad</label>
        <Dropdown
          id="activity"
          value={formData.activityId}
          options={activities.map(a => ({ label: a.nombre, value: a.id }))}
          onChange={(e) => setFormData({ ...formData, activityId: e.value })}
          placeholder="Selecciona una actividad"
          className="w-full"
        />
      </div>

      <div className="form-group">
        <label htmlFor="worker">Trabajador</label>
        <Dropdown
          id="worker"
          value={formData.workerId}
          options={workers.map(w => ({ label: w.especialidad, value: w.id }))}
          onChange={(e) => setFormData({ ...formData, workerId: e.value })}
          placeholder="Selecciona un trabajador"
          className="w-full"
        />
      </div>

      <div className="form-group">
        <label htmlFor="startDate">Fecha de Inicio</label>
        <Calendar
          id="startDate"
          value={formData.startDate}
          onChange={(e) => setFormData({ ...formData, startDate: e.value })}
          showTime
          hourFormat="24"
        />
      </div>

      <div className="form-group">
        <label htmlFor="endDate">Fecha de Fin</label>
        <Calendar
          id="endDate"
          value={formData.endDate}
          onChange={(e) => setFormData({ ...formData, endDate: e.value })}
          showTime
          hourFormat="24"
        />
      </div>

      <div className="form-group">
        <label htmlFor="status">Estado</label>
        <Dropdown
          id="status"
          value={formData.status}
          options={statusOptions}
          onChange={(e) => setFormData({ ...formData, status: e.value })}
          placeholder="Selecciona un estado"
          className="w-full"
        />
      </div>

      {error && (
        <div className="error-message">{error}</div>
      )}

      <div className="form-buttons">
        <Button
          label="Cancelar"
          icon="pi pi-times"
          className="btn-cancel"
          onClick={onClose}
          type="button"
        />
        <Button
          label="Guardar"
          icon="pi pi-check"
          className="btn-save"
          loading={loading}
          type="submit"
        />
      </div>
    </form>
  );
};

export default AssignmentForm;