import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { Toast } from 'primereact/toast';
import { ProgressSpinner } from 'primereact/progressspinner';
import { useAssignments } from '../../context/hooks/useAssignments';
import { useActivities } from '../../context/hooks/useActivities';
import { useAuth } from '../../context/AuthContext';
import { AuthContext } from '../../context/AuthContext';
import Sidebar from '../Sidebar';
import AssignmentForm from './AssignmentForm';
import '../../layouts/dashboard/dashboard.css';

const Assignments = () => {
  const { 
    assignments,
    loading,
    error,
    getAssignments,
    deleteAssignment
  } = useAssignments();

  const { activities } = useActivities();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [showDialog, setShowDialog] = useState(false);
  const [selectedAssignment, setSelectedAssignment] = useState(null);

  useEffect(() => {
    const loadAssignments = async () => {
      try {
        await getAssignments();
      } catch (err) {
        console.error('Error al cargar las asignaciones:', err);
      }
    };
    loadAssignments();
  }, [getAssignments]);

  const handleEdit = (assignment) => {
    setSelectedAssignment(assignment);
    setShowDialog(true);
  };

  const handleDelete = async (assignmentId) => {
    try {
      await deleteAssignment(assignmentId);
      Toast.current.show({ 
        severity: 'success', 
        summary: 'Éxito', 
        detail: 'Asignación eliminada correctamente' 
      });
    } catch (error) {
      Toast.current.show({ 
        severity: 'error', 
        summary: 'Error', 
        detail: 'Error al eliminar la asignación' 
      });
    }
  };

  const actionsTemplate = (rowData) => {
    return (
      <div className="flex gap-2">
        <Button 
          icon="pi pi-pencil" 
          className="p-button-rounded p-button-text" 
          onClick={() => handleEdit(rowData)}
        />
        <Button 
          icon="pi pi-trash" 
          className="p-button-rounded p-button-text p-button-danger" 
          onClick={() => handleDelete(rowData.id)}
        />
      </div>
    );
  };

  const activityTemplate = (rowData) => {
    return rowData.activity ? rowData.activity.nombre : 'N/A';
  };

  const statusTemplate = (rowData) => {
    const statusClasses = {
      pendiente: 'bg-yellow-100 text-yellow-900',
      en_progreso: 'bg-blue-100 text-blue-900',
      completada: 'bg-green-100 text-green-900',
      cancelada: 'bg-red-100 text-red-900'
    };

    return (
      <span className={`px-3 py-1 rounded-lg ${statusClasses[rowData.status] || statusClasses.pendiente}`}>
        {(rowData.status || 'pendiente').replace('_', ' ').toUpperCase()}
      </span>
    );
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <ProgressSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4">
        <div className="text-red-500">
          Error al cargar las asignaciones: {error}
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <Sidebar />

      <main className="main-content">
        <div className="p-4">
          <Toast ref={Toast} />

          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold">Asignaciones</h1>
            <Button 
              label="Nueva Asignación" 
              icon="pi pi-plus" 
              onClick={() => setShowDialog(true)}
            />
          </div>

          <DataTable 
            value={assignments} 
            paginator 
            rows={10} 
            rowsPerPageOptions={[5, 10, 25]}
            className="p-datatable-striped"
          >
            <Column field="id" header="ID" sortable />
            <Column field="activityId" header="Actividad" body={activityTemplate} sortable />
            <Column field="workerId" header="ID Trabajador" sortable />
            <Column field="startDate" header="Fecha Inicio" sortable />
            <Column field="endDate" header="Fecha Fin" sortable />
            <Column field="status" header="Estado" body={statusTemplate} sortable />
            <Column body={actionsTemplate} header="Acciones" />
          </DataTable>

          <Dialog
            visible={showDialog}
            onHide={() => {
              setShowDialog(false);
              setSelectedAssignment(null);
            }}
            header={selectedAssignment ? "Editar Asignación" : "Nueva Asignación"}
            style={{ width: '50vw' }}
          >
            <AssignmentForm
              assignment={selectedAssignment}
              onClose={() => {
                setShowDialog(false);
                setSelectedAssignment(null);
              }}
            />
          </Dialog>
        </div>
      </main>
    </div>
  );
};

export default Assignments;