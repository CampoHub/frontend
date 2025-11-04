import { useContext } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { AssignmentsContext } from '../../context/AssignmentsContext';
import '../../layouts/dashboard/dashboard.css';
import './assignments.css';

const AssignmentList = ({ assignments, onEdit, onDelete }) => {
  const { removeAssignment } = useContext(AssignmentsContext);

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar esta asignación?')) {
      try {
        await removeAssignment(id);
        onDelete(id);
      } catch (error) {
        console.error('Error al eliminar la asignación:', error);
      }
    }
  };

  const actionBodyTemplate = (rowData) => {
    return (
      <div className="flex gap-2">
        <button
          className="btn btn-edit"
          onClick={() => onEdit(rowData)}
        >
          <i className="pi pi-pencil"></i>
          Editar
        </button>
        <button
          className="btn btn-delete"
          onClick={() => handleDelete(rowData.id)}
        >
          <i className="pi pi-trash"></i>
          Eliminar
        </button>
      </div>
    );
  };

  return (
    <div className="assignments-table-container">
      {assignments.length === 0 ? (
        <p className="empty-message">No hay asignaciones registradas</p>
      ) : (
        <DataTable value={assignments} paginator rows={10} className="p-datatable-striped">
          <Column field="id" header="ID" sortable></Column>
          <Column field="activityId" header="Actividad" sortable></Column>
          <Column field="workerId" header="Trabajador" sortable></Column>
          <Column field="startDate" header="Fecha Inicio" sortable></Column>
          <Column field="endDate" header="Fecha Fin" sortable></Column>
          <Column field="status" header="Estado" sortable></Column>
          <Column body={actionBodyTemplate} header="Acciones"></Column>
        </DataTable>
      )}
    </div>
  );
};

export default AssignmentList;