import { useState, useEffect, useContext } from 'react';
import { PlotsContext } from '../../context/PlotsContext';
import './plots.css';

const PlotForm = ({ plot = null, onClose }) => {
  const [formData, setFormData] = useState({
    nombre: '',
    superficie: '',
    tipo_cultivo: '',
    estado: ''
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const { addPlot, updatePlot } = useContext(PlotsContext);

  useEffect(() => {
    if (plot) {
      setFormData({
        nombre: plot.nombre || '',
        superficie: plot.superficie || '',
        tipo_cultivo: plot.tipo_cultivo || '',
        estado: plot.estado || ''
      });
    }
  }, [plot]);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.nombre.trim()) newErrors.nombre = 'El nombre es obligatorio';
    if (!formData.superficie) newErrors.superficie = 'El tamaño es obligatorio';
    if (!formData.tipo_cultivo.trim()) newErrors.tipo_cultivo = 'El tipo es obligatorio';
    if (!formData.estado.trim()) newErrors.estado = 'El estado es obligatorio';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'size' ? (value === '' ? '' : parseFloat(value)) : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    setErrors({});

    try {
      if (plot) {
        await updatePlot(plot.id, formData);
        alert('Parcela actualizada correctamente');
      } else {
        await addPlot(formData);
        alert('Parcela creada correctamente');
      }
      onClose();
    } catch (error) {
      console.error('Error al guardar la parcela:', error);
      setErrors({ submit: error.message || 'Error al guardar la parcela' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="form-container" style={{ background: 'var(--card-background)', boxShadow: 'var(--box-shadow)', borderRadius: '10px', padding: '2rem', maxWidth: '400px', margin: '0 auto' }} onSubmit={handleSubmit}>
      <h2 style={{ color: 'var(--primary-color)', fontWeight: 700, marginBottom: '1.5rem', fontSize: '1.3rem' }}>{plot ? 'Editar Parcela' : 'Nueva Parcela'}</h2>
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
        <label htmlFor="superficie" style={{ fontWeight: 500, color: 'var(--text-primary)' }}>Tamaño (hectáreas):</label>
        <input
          type="number"
          id="superficie"
          name="superficie"
          value={formData.superficie}
          onChange={handleChange}
          step="0.01"
          min="0"
          className={errors.superficie ? 'error' : ''}
          style={{ width: '100%', padding: '0.7rem', borderRadius: '6px', border: '1px solid var(--border-color)', marginTop: '0.3rem', fontSize: '1rem' }}
        />
        {errors.superficie && <span className="error-message" style={{ color: 'var(--danger-color)', fontSize: '0.9rem' }}>{errors.superficie}</span>}
      </div>
      <div className="form-group" style={{ marginBottom: '1rem' }}>
        <label htmlFor="tipo_cultivo" style={{ fontWeight: 500, color: 'var(--text-primary)' }}>Tipo:</label>
        <select
          id="tipo_cultivo"
          name="tipo_cultivo"
          value={formData.tipo_cultivo}
          onChange={handleChange}
          className={errors.tipo_cultivo ? 'error' : ''}
          style={{ width: '100%', padding: '0.7rem', borderRadius: '6px', border: '1px solid var(--border-color)', marginTop: '0.3rem', fontSize: '1rem' }}
        >
          <option value="">Selecciona un tipo</option>
          <option value="Cultivo">Cultivo</option>
          <option value="Ganadería">Ganadería</option>
          <option value="Mixto">Mixto</option>
          <option value="Otro">Otro</option>
        </select>
        {errors.tipo_cultivo && <span className="error-message" style={{ color: 'var(--danger-color)', fontSize: '0.9rem' }}>{errors.tipo_cultivo}</span>}
      </div>
      <div className="form-group" style={{ marginBottom: '1rem' }}>
        <label htmlFor="estado" style={{ fontWeight: 500, color: 'var(--text-primary)' }}>Tipo:</label>
        <select
          id="estado"
          name="estado"
          value={formData.estado}
          onChange={handleChange}
          className={errors.estado ? 'error' : ''}
          style={{ width: '100%', padding: '0.7rem', borderRadius: '6px', border: '1px solid var(--border-color)', marginTop: '0.3rem', fontSize: '1rem' }}
        >
          <option value="">Selecciona un estado</option>
          <option value="sembrado">Sembrado</option>
          <option value="cosechado">Cosechado</option>
          <option value="en preparación">En preparación</option>
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
          {loading ? 'Guardando...' : plot ? 'Actualizar' : 'Crear'}
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

export default PlotForm;