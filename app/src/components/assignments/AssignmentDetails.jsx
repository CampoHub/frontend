import React from 'react';
import './assignments.css';

const AssignmentDetails = ({ assignment }) => {
  if (!assignment) {
    return <div className="assignment-details">No hay asignación seleccionada.</div>;
  }

  return (
    <div className="assignment-details">
      <h2 className="details-title">Detalles de la Asignación</h2>
      <div className="details-content">
        <p><strong>Actividad:</strong> {assignment.activityId}</p>
        <p><strong>Trabajador:</strong> {assignment.workerId}</p>
        <p><strong>Fecha de Inicio:</strong> {new Date(assignment.startDate).toLocaleDateString()}</p>
        <p><strong>Fecha de Fin:</strong> {new Date(assignment.endDate).toLocaleDateString()}</p>
        <p><strong>Estado:</strong> {assignment.status}</p>
      </div>
    </div>
  );
};

export default AssignmentDetails;