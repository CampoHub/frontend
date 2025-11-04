import { useState, useEffect, useContext } from 'react';
import { useResources } from '../../context/hooks/useResources';
import { PlotsContext } from '../../context/PlotsContext';

const ResourceForm = ({ resource = null, onClose }) => {
  const [formData, setFormData] = useState({
    tipo: '',
    cantidad: '',
    disponible: true,
    id_parcela: ''
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const { createResource, updateResource } = useResources();
  const { plots } = useContext(PlotsContext);

  useEffect(() => {
    if (resource) {
      setFormData({
        tipo: resource.tipo || '',
        cantidad: resource.cantidad || '',
        disponible: resource.disponible ?? true,
        id_parcela: resource.id_parcela || ''
      });
    }
  }, [resource]);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.tipo.trim()) newErrors.tipo = 'El tipo es obligatorio';
    if (formData.cantidad === '' || isNaN(formData.cantidad) || Number(formData.cantidad) < 0) newErrors.cantidad = 'Cantidad inválida';
    if (!formData.id_parcela) newErrors.id_parcela = 'Debe seleccionar una parcela';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setLoading(true);
    setErrors({});
    try {
      if (resource) {
        await updateResource(resource.id, formData);
        alert('Recurso actualizado correctamente');
      } else {
        await createResource(formData);
        alert('Recurso creado correctamente');
      }
      onClose();
    } catch (error) {
      setErrors({ submit: error.message || 'Error al guardar el recurso' });
    } finally {
      setLoading(false);
    }
  };

  const formStyles = {
    background: 'var(--card-background)', 
    boxShadow: 'var(--box-shadow)', 
    borderRadius: '10px', 
    padding: '1.5rem',
    width: '100%',
    maxWidth: '380px',
    margin: '0 auto'
  };

  const titleStyles = {
    color: 'var(--primary-color)',
    fontWeight: 700,
    marginBottom: '1.2rem',
    fontSize: '1.4rem',
    textAlign: 'center'
  };

  const formGroupStyles = {
    marginBottom: '1rem'
  };

  const labelStyles = {
    fontWeight: 500,
    color: 'var(--text-primary)',
    display: 'block',
    marginBottom: '0.3rem'
  };

  const inputBaseStyles = { 
    width: '100%', 
    padding: '0.7rem', 
    borderRadius: '6px', 
    border: '1px solid var(--border-color)', 
    fontSize: '1rem',
    boxSizing: 'border-box'
  };

  const checkboxGroupStyles = {
    ...formGroupStyles,
    display: 'flex',
    alignItems: 'center'
  };

  return (
    <form className="form-container" style={formStyles} onSubmit={handleSubmit}>
      <h2 style={titleStyles}>{resource ? 'Editar Recurso' : 'Nuevo Recurso'}</h2>

      {/* Tipo */}
      <div className="form-group" style={formGroupStyles}>
        <label htmlFor="tipo" style={labelStyles}>Tipo:</label>
        <input
          type="text"
          id="tipo"
          name="tipo"
          value={formData.tipo}
          onChange={handleChange}
          className={errors.tipo ? 'error' : ''}
          style={inputBaseStyles}
        />
        {errors.tipo && <span className="error-message" style={{ color: 'var(--danger-color)', fontSize: '0.9rem' }}>{errors.tipo}</span>}
      </div>

      {/* Cantidad */}
      <div className="form-group" style={formGroupStyles}>
        <label htmlFor="cantidad" style={labelStyles}>Cantidad:</label>
        <input
          type="number"
          id="cantidad"
          name="cantidad"
          value={formData.cantidad}
          onChange={handleChange}
          min="0"
          className={errors.cantidad ? 'error' : ''}
          style={inputBaseStyles}
        />
        {errors.cantidad && <span className="error-message" style={{ color: 'var(--danger-color)', fontSize: '0.9rem' }}>{errors.cantidad}</span>}
      </div>

      {/* Disponible (Alineación con flexbox) */}
      <div className="form-group" style={checkboxGroupStyles}>
        <label htmlFor="disponible" style={{ ...labelStyles, marginBottom: 0, marginRight: '1rem' }}>Disponible:</label>
        <input
          type="checkbox"
          id="disponible"
          name="disponible"
          checked={formData.disponible}
          onChange={handleChange}
          // Estilo base para el checkbox
          style={{ transform: 'scale(1.2)' }} 
        />
      </div>

      {/* Parcela */}
      <div className="form-group" style={formGroupStyles}>
        <label htmlFor="id_parcela" style={labelStyles}>Parcela:</label>
        <select
          id="id_parcela"
          name="id_parcela"
          value={formData.id_parcela}
          onChange={handleChange}
          className={errors.id_parcela ? 'error' : ''}
          style={inputBaseStyles}
        >
          <option value="">Selecciona una parcela</option>
          {plots.map(plot => (
            <option key={plot.id} value={plot.id}>{plot.nombre}</option>
          ))}
        </select>
        {errors.id_parcela && <span className="error-message" style={{ color: 'var(--danger-color)', fontSize: '0.9rem' }}>{errors.id_parcela}</span>}
      </div>

      {/* Botones (Alineación a la derecha) */}
      <div className="form-buttons" style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1.5rem' }}>
        <button 
          type="submit" 
          className="btn btn-primary" 
          style={{ 
            background: 'var(--primary-color)', 
            color: '#fff', 
            borderRadius: '6px', 
            border: 'none', 
            padding: '0.6rem 1.2rem', // Ligeramente más relleno
            opacity: loading ? 0.7 : 1,
            cursor: loading ? 'not-allowed' : 'pointer',
            fontWeight: 600
          }}
          disabled={loading}
        >
          {loading ? 'Guardando...' : resource ? 'Actualizar' : 'Crear'}
        </button>
        <button 
          type="button"
          className="btn btn-cancel"
          style={{
            background: 'transparent',
            color: 'var(--primary-color)',
            border: '1px solid var(--primary-color)',
            borderRadius: '6px',
            padding: '0.6rem 1.2rem',
            cursor: loading ? 'not-allowed' : 'pointer',
            fontWeight: 600
          }} 
          onClick={onClose}
          disabled={loading}
        >
          Cancelar
        </button>
      </div>

      {/* Mensaje de Error de Submit */}
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

export default ResourceForm;