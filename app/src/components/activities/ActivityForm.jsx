import { useState, useEffect, useContext } from 'react';
import { ActivitiesContext } from '../../context/ActivitiesContext';
import './activities.css';

const ActivityForm = ({ activity = null, onClose }) => {
  const [formData, setFormData] = useState({
    nombre: '',
    tipo: '',
    estado: ''
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const { addActivity, updateActivity } = useContext(ActivitiesContext);

  useEffect(() => {
    if (activity) {
      setFormData({
        nombre: activity.nombre || '',
        tipo: activity.tipo || '',
        estado: activity.estado || ''
      });
    }
  }, [activity]);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.nombre.trim()) newErrors.nombre = 'El nombre es obligatorio';
    if (!formData.tipo.trim()) newErrors.tipo = 'El tipo es obligatorio';
    if (!formData.estado.trim()) newErrors.estado = 'El estado es obligatorio';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    setErrors({});

    try {
      if (activity) {
        await updateActivity(activity.id, formData);
        alert('Actividad actualizada correctamente');
      } else {
        await addActivity(formData);
        alert('Actividad creada correctamente');
      }
      onClose();
    } catch (error) {
      console.error('Error al guardar la actividad:', error);
      setErrors({ submit: error.message || 'Error al guardar la actividad' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="form-container" style={{ background: 'var(--card-background)', boxShadow: 'var(--box-shadow)', borderRadius: '10px', padding: '2rem', maxWidth: '400px', margin: '0 auto' }} onSubmit={handleSubmit}>
      <h2 style={{ color: 'var(--primary-color)', fontWeight: 700, marginBottom: '1.5rem', fontSize: '1.3rem' }}>{activity ? 'Editar Actividad' : 'Nueva Actividad'}</h2>
      <div className="form-group" style={{ marginBottom: '1rem' }}>
        <label htmlFor="nombre" style={{ fontWeight: 500, color: 'var(--text-primary)' }}>Nombre:</label>
        <input
          type="text"
          id="nombre"
          name="nombre"
          value={formData.nombre}
          onChange={handleChange}
          className={errors.nombre ? 'error' : ''}
          style={{ width: '100%', padding: '0.7rem', borderRadius: '6px', border: '1px solid var(--border-color)', marginTop: '0.3rem', fontSize: '1rem' }}
        />
        {errors.nombre && <span className="error-message" style={{ color: 'var(--danger-color)', fontSize: '0.9rem' }}>{errors.nombre}</span>}
      </div>
      <div className="form-group" style={{ marginBottom: '1rem' }}>
        <label htmlFor="tipo" style={{ fontWeight: 500, color: 'var(--text-primary)' }}>Tipo:</label>
        <select
          id="tipo"
          name="tipo"
          value={formData.tipo}
          onChange={handleChange}
          className={errors.tipo ? 'error' : ''}
          style={{ width: '100%', padding: '0.7rem', borderRadius: '6px', border: '1px solid var(--border-color)', marginTop: '0.3rem', fontSize: '1rem' }}
        >
          <option value="">Selecciona un tipo</option>
          <option value="Siembra">Siembra</option>
          <option value="Cosecha">Cosecha</option>
          <option value="Riego">Riego</option>
          <option value="Fumigación">Fumigación</option>
        </select>
        {errors.tipo && <span className="error-message" style={{ color: 'var(--danger-color)', fontSize: '0.9rem' }}>{errors.tipo}</span>}
      </div>
      <div className="form-group" style={{ marginBottom: '1rem' }}>
        <label htmlFor="estado" style={{ fontWeight: 500, color: 'var(--text-primary)' }}>Estado:</label>
        <select
          id="estado"
          name="estado"
          value={formData.estado}
          onChange={handleChange}
          className={errors.estado ? 'error' : ''}
          style={{ width: '100%', padding: '0.7rem', borderRadius: '6px', border: '1px solid var(--border-color)', marginTop: '0.3rem', fontSize: '1rem' }}
        >
          <option value="">Selecciona un estado</option>
          <option value="pendiente">Pendiente</option>
          <option value="en progreso">En progreso</option>
          <option value="completada">Completada</option>
        </select>
        {errors.estado && <span className="error-message" style={{ color: 'var(--danger-color)', fontSize: '0.9rem' }}>{errors.estado}</span>}
      </div>
      <div className="form-buttons" style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '2rem' }}>
        <button 
          type="submit" 
          className="btn btn-primary" 
          style={{ 
            background: 'var(--primary-color)', 
            color: '#fff', 
            borderRadius: '6px', 
            border: 'none', 
            padding: '0.5rem 1.2rem',
            opacity: loading ? 0.7 : 1,
            cursor: loading ? 'not-allowed' : 'pointer'
          }}
          disabled={loading}
        >
          {loading ? 'Guardando...' : activity ? 'Actualizar' : 'Crear'}
        </button>
        <button 
          type="button" 
          className="btn btn-cancel" 
          style={{ 
            background: 'transparent', 
            color: 'var(--primary-color)', 
            border: '1px solid var(--primary-color)', 
            borderRadius: '6px', 
            padding: '0.5rem 1.2rem',
            cursor: loading ? 'not-allowed' : 'pointer'
          }} 
          onClick={onClose}
          disabled={loading}
        >
          Cancelar
        </button>
      </div>
      {errors.submit && (
        <div className="error-message" style={{ 
          color: 'var(--danger-color)', 
          marginTop: '1rem', 
          textAlign: 'center' 
        }}>
          {errors.submit}
        </div>
      )}
    </form>
  );
};

export default ActivityForm;