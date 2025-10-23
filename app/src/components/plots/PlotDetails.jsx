import React from 'react';

const PlotDetails = ({ plot, onEdit }) => {
  if (!plot) {
    return <div>No hay parcela seleccionada.</div>;
  }

  return (
    <div className="plot-details" style={{ background: 'var(--card-background)', boxShadow: 'var(--box-shadow)', borderRadius: '10px', padding: '2rem', maxWidth: '400px', margin: '0 auto' }}>
      <h3 style={{ color: 'var(--primary-color)', fontWeight: 700, fontSize: '1.3rem', marginBottom: '1rem' }}>{plot.name}</h3>
      <p style={{ color: 'var(--text-light)', marginBottom: '0.5rem' }}><strong>Tamaño:</strong> {plot.size} hectáreas</p>
      <p style={{ color: 'var(--text-light)', marginBottom: '0.5rem' }}><strong>Tipo:</strong> {plot.type}</p>
      {plot.description && <p style={{ color: 'var(--text-light)', marginBottom: '1rem' }}><strong>Descripción:</strong> {plot.description}</p>}
      <button className="btn btn-edit" style={{ background: 'var(--primary-color)', color: '#fff', borderRadius: '6px', border: 'none', padding: '0.5rem 1.2rem', marginTop: '1rem' }} onClick={onEdit}>
        <i className="pi pi-pencil" style={{ marginRight: 4 }}></i> Editar
      </button>
    </div>
  );
};

export default PlotDetails;