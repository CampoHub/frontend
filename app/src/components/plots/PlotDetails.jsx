import React from 'react';

const PlotDetails = ({ plot, onEdit }) => {
  if (!plot) {
    return <div>No hay parcela seleccionada.</div>;
  }

  return (
    <div className="plot-details">
      <h3>{plot.name}</h3>
      <p><strong>Tamaño:</strong> {plot.size} hectáreas</p>
      <p><strong>Tipo:</strong> {plot.type}</p>
      {plot.description && <p><strong>Descripción:</strong> {plot.description}</p>}
      <button className="btn btn-edit" onClick={onEdit}>Editar</button>
    </div>
  );
};

export default PlotDetails;