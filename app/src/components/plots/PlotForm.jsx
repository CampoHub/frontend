import { useState, useEffect, useContext } from 'react';
import { PlotsContext } from '../../context/PlotsContext';

const PlotForm = ({ plot = null, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    size: '',
    type: '',
    location: '',
    description: ''
  });
  const [errors, setErrors] = useState({});
  const { addPlot, updatePlot } = useContext(PlotsContext);

  useEffect(() => {
    if (plot) {
      setFormData({
        name: plot.name || '',
        size: plot.size || '',
        type: plot.type || '',
        location: plot.location || '',
        description: plot.description || ''
      });
    }
  }, [plot]);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'El nombre es obligatorio';
    if (!formData.size) newErrors.size = 'El tamaño es obligatorio';
    if (!formData.type.trim()) newErrors.type = 'El tipo es obligatorio';
    
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

    try {
      if (plot) {
        await updatePlot(plot.id, formData);
      } else {
        await addPlot(formData);
      }
      onSave();
    } catch (error) {
      console.error('Error al guardar la parcela:', error);
    }
  };

  return (
    <form className="form-container" style={{ background: 'var(--card-background)', boxShadow: 'var(--box-shadow)', borderRadius: '10px', padding: '2rem', maxWidth: '400px', margin: '0 auto' }} onSubmit={handleSubmit}>
      <h2 style={{ color: 'var(--primary-color)', fontWeight: 700, marginBottom: '1.5rem', fontSize: '1.3rem' }}>{plot ? 'Editar Parcela' : 'Nueva Parcela'}</h2>
      <div className="form-group" style={{ marginBottom: '1rem' }}>
        <label htmlFor="name" style={{ fontWeight: 500, color: 'var(--text-primary)' }}>Nombre:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className={errors.name ? 'error' : ''}
          style={{ width: '100%', padding: '0.7rem', borderRadius: '6px', border: '1px solid var(--border-color)', marginTop: '0.3rem', fontSize: '1rem' }}
        />
        {errors.name && <span className="error-message" style={{ color: 'var(--danger-color)', fontSize: '0.9rem' }}>{errors.name}</span>}
      </div>
      <div className="form-group" style={{ marginBottom: '1rem' }}>
        <label htmlFor="size" style={{ fontWeight: 500, color: 'var(--text-primary)' }}>Tamaño (hectáreas):</label>
        <input
          type="number"
          id="size"
          name="size"
          value={formData.size}
          onChange={handleChange}
          step="0.01"
          min="0"
          className={errors.size ? 'error' : ''}
          style={{ width: '100%', padding: '0.7rem', borderRadius: '6px', border: '1px solid var(--border-color)', marginTop: '0.3rem', fontSize: '1rem' }}
        />
        {errors.size && <span className="error-message" style={{ color: 'var(--danger-color)', fontSize: '0.9rem' }}>{errors.size}</span>}
      </div>
      <div className="form-group" style={{ marginBottom: '1rem' }}>
        <label htmlFor="type" style={{ fontWeight: 500, color: 'var(--text-primary)' }}>Tipo:</label>
        <select
          id="type"
          name="type"
          value={formData.type}
          onChange={handleChange}
          className={errors.type ? 'error' : ''}
          style={{ width: '100%', padding: '0.7rem', borderRadius: '6px', border: '1px solid var(--border-color)', marginTop: '0.3rem', fontSize: '1rem' }}
        >
          <option value="">Selecciona un tipo</option>
          <option value="Cultivo">Cultivo</option>
          <option value="Ganadería">Ganadería</option>
          <option value="Mixto">Mixto</option>
          <option value="Otro">Otro</option>
        </select>
        {errors.type && <span className="error-message" style={{ color: 'var(--danger-color)', fontSize: '0.9rem' }}>{errors.type}</span>}
      </div>
      <div className="form-group" style={{ marginBottom: '1rem' }}>
        <label htmlFor="location" style={{ fontWeight: 500, color: 'var(--text-primary)' }}>Ubicación:</label>
        <input
          type="text"
          id="location"
          name="location"
          value={formData.location}
          onChange={handleChange}
          style={{ width: '100%', padding: '0.7rem', borderRadius: '6px', border: '1px solid var(--border-color)', marginTop: '0.3rem', fontSize: '1rem' }}
        />
      </div>
      <div className="form-group" style={{ marginBottom: '1rem' }}>
        <label htmlFor="description" style={{ fontWeight: 500, color: 'var(--text-primary)' }}>Descripción:</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows="3"
          style={{ width: '100%', padding: '0.7rem', borderRadius: '6px', border: '1px solid var(--border-color)', marginTop: '0.3rem', fontSize: '1rem', resize: 'vertical' }}
        />
      </div>
      <div className="form-buttons" style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '2rem' }}>
        <button type="button" className="btn btn-cancel" style={{ background: 'transparent', color: 'var(--primary-color)', border: '1px solid var(--primary-color)', borderRadius: '6px', padding: '0.5rem 1.2rem' }} onClick={onCancel}>
          Cancelar
        </button>
        <button type="submit" className="btn btn-save" style={{ background: 'var(--primary-color)', color: '#fff', borderRadius: '6px', border: 'none', padding: '0.5rem 1.2rem' }}>
          Guardar
        </button>
      </div>
    </form>
  );
};

export default PlotForm;