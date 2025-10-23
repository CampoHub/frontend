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
    <form className="form-container" onSubmit={handleSubmit}>
      <h2>{plot ? 'Editar Parcela' : 'Nueva Parcela'}</h2>
      
      <div className="form-group">
        <label htmlFor="name">Nombre:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className={errors.name ? 'error' : ''}
        />
        {errors.name && <span className="error-message">{errors.name}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="size">Tamaño (hectáreas):</label>
        <input
          type="number"
          id="size"
          name="size"
          value={formData.size}
          onChange={handleChange}
          step="0.01"
          min="0"
          className={errors.size ? 'error' : ''}
        />
        {errors.size && <span className="error-message">{errors.size}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="type">Tipo:</label>
        <select
          id="type"
          name="type"
          value={formData.type}
          onChange={handleChange}
          className={errors.type ? 'error' : ''}
        >
          <option value="">Selecciona un tipo</option>
          <option value="Cultivo">Cultivo</option>
          <option value="Ganadería">Ganadería</option>
          <option value="Mixto">Mixto</option>
          <option value="Otro">Otro</option>
        </select>
        {errors.type && <span className="error-message">{errors.type}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="location">Ubicación:</label>
        <input
          type="text"
          id="location"
          name="location"
          value={formData.location}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="description">Descripción:</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows="4"
        />
      </div>

      <div className="form-buttons">
        <button type="button" className="btn btn-cancel" onClick={onCancel}>
          Cancelar
        </button>
        <button type="submit" className="btn btn-save">
          Guardar
        </button>
      </div>
    </form>
  );
};

export default PlotForm;