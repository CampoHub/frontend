import { useState, useEffect, useContext } from 'react';
import { ActivitiesContext } from '../../context/ActivitiesContext';
import { PlotsContext } from '../../context/PlotsContext';

const ActivityForm = ({ activity = null, onClose }) => {
  const { addActivity, updateActivity } = useContext(ActivitiesContext);
  const { plots } = useContext(PlotsContext);
  const [formData, setFormData] = useState({
    nombre: '',
    tipo: '',
    id_parcela: '',
    fecha_inicio: '',
    fecha_fin: '',
    estado: ''
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (activity) {
      setFormData({
        nombre: activity.nombre || '',
        tipo: activity.tipo || '',
        id_parcela: activity.id_parcela || '',
        fecha_inicio: activity.fecha_inicio?.split('T')[0] || '',
        fecha_fin: activity.fecha_fin?.split('T')[0] || '',
        estado: activity.estado || ''
      });
    }
  }, [activity]);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.nombre.trim()) newErrors.nombre = 'El nombre es obligatorio';
    if (!formData.tipo.trim()) newErrors.tipo = 'El tipo es obligatorio';
    if (!formData.id_parcela) newErrors.id_parcela = 'La parcela es obligatoria';
    if (!formData.fecha_inicio) newErrors.fecha_inicio = 'La fecha de inicio es obligatoria';
    if (!formData.estado) newErrors.estado = 'El estado es obligatorio';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      if (activity) {
        await updateActivity(activity.id, formData);
      } else {
        await addActivity(formData);
      }
      onClose();
    } catch (error) {
      console.error('Error al guardar la actividad:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <div className="form-group">
        <label htmlFor="nombre">Nombre:</label>
        <input
          type="text"
          id="nombre"
          name="nombre"
          value={formData.nombre}
          onChange={handleChange}
          className={errors.nombre ? 'error' : ''}
        />
        {errors.nombre && <span className="error-message">{errors.nombre}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="tipo">Tipo:</label>
        <select
          id="tipo"
          name="tipo"
          value={formData.tipo}
          onChange={handleChange}
          className={errors.tipo ? 'error' : ''}
        >
          <option value="">Seleccione un tipo</option>
          <option value="Siembra">Siembra</option>
          <option value="Cosecha">Cosecha</option>
          <option value="Fumigación">Fumigación</option>
          <option value="Riego">Riego</option>
          <option value="Mantenimiento">Mantenimiento</option>
        </select>
        {errors.tipo && <span className="error-message">{errors.tipo}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="id_parcela">Parcela:</label>
        <select
          id="id_parcela"
          name="id_parcela"
          value={formData.id_parcela}
          onChange={handleChange}
          className={errors.id_parcela ? 'error' : ''}
        >
          <option value="">Seleccione una parcela</option>
          {plots.map(plot => (
            <option key={plot.id} value={plot.id}>
              {plot.nombre}
            </option>
          ))}
        </select>
        {errors.id_parcela && <span className="error-message">{errors.id_parcela}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="fecha_inicio">Fecha de inicio:</label>
        <input
          type="date"
          id="fecha_inicio"
          name="fecha_inicio"
          value={formData.fecha_inicio}
          onChange={handleChange}
          className={errors.fecha_inicio ? 'error' : ''}
        />
        {errors.fecha_inicio && <span className="error-message">{errors.fecha_inicio}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="fecha_fin">Fecha de fin:</label>
        <input
          type="date"
          id="fecha_fin"
          name="fecha_fin"
          value={formData.fecha_fin}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="estado">Estado:</label>
        <select
          id="estado"
          name="estado"
          value={formData.estado}
          onChange={handleChange}
          className={errors.estado ? 'error' : ''}
        >
          <option value="">Seleccione un estado</option>
          <option value="pendiente">Pendiente</option>
          <option value="en progreso">En progreso</option>
          <option value="completada">Completada</option>
        </select>
        {errors.estado && <span className="error-message">{errors.estado}</span>}
      </div>

      <div className="form-buttons">
        <button type="button" className="btn btn-cancel" onClick={onClose}>
          Cancelar
        </button>
        <button type="submit" className="btn btn-save">
          Guardar
        </button>
      </div>
    </form>
  );
};

export default ActivityForm;