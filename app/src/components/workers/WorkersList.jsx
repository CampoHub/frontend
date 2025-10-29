import { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { useWorkers } from '../../context/WorkersContext';
import { useActivities } from '../../context/hooks/useActivities';
import { useAuth } from '../../context/AuthContext';
import WorkerForm from './WorkerForm';
import AssignWorkerModal from './AssignWorkerModal';
import './workers.css';

const WorkersList = () => {
  const { workers, loading, removeWorker } = useWorkers();
  const { activities, getActivities } = useActivities();
  const { user } = useAuth();
  const [selectedWorker, setSelectedWorker] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [showAssignModal, setShowAssignModal] = useState(false);

  useEffect(() => {
    getActivities();
  }, [getActivities]);

  const handleEditWorker = (worker) => {
    setSelectedWorker(worker);
    setShowForm(true);
  };

  const confirmDelete = (worker) => {
    confirmDialog({
      message: '¿Estás seguro de que deseas eliminar este trabajador?',
      header: 'Confirmar Eliminación',
      icon: 'pi pi-exclamation-triangle',
      accept: () => removeWorker(worker.id),
      reject: () => {}
    });
  };

  const actionBodyTemplate = (worker) => {
    return (
      <div className="action-buttons">
        <Button 
          icon="pi pi-pencil" 
          rounded 
          text 
          severity="success"
          onClick={() => handleEditWorker(worker)}
          tooltip="Editar trabajador"
        />
        <Button 
          icon="pi pi-trash" 
          rounded 
          text 
          severity="danger"
          onClick={() => confirmDelete(worker)}
          tooltip="Eliminar trabajador"
        />
        {user?.role === 'admin' && (
          <Button 
            icon="pi pi-user-plus" 
            rounded 
            text 
            severity="info"
            onClick={() => {
              setSelectedWorker(worker);
              setShowAssignModal(true);
            }}
            tooltip="Asignar a actividad"
          />
        )}
      </div>
    );
  };


  return (
    <div className="card-content">
      <div className="flex justify-content-between align-items-center mb-4">
        <div className="flex align-items-center gap-2">
          <Button
            label="Nuevo Trabajador"
            icon="pi pi-plus"
            className="p-button-success"
            onClick={() => {
              setSelectedWorker(null);
              setShowForm(true);
            }}
          />
        </div>
        <div className="flex gap-2">
          <Button
            icon="pi pi-file-excel"
            className="p-button-outlined p-button-success"
            tooltip="Exportar a Excel"
            tooltipOptions={{ position: 'bottom' }}
          />
          <Button
            icon="pi pi-file-pdf"
            className="p-button-outlined p-button-danger"
            tooltip="Exportar a PDF"
            tooltipOptions={{ position: 'bottom' }}
          />
        </div>
      </div>

      <DataTable
        value={workers}
        className="workers-table"
        loading={loading}
        paginator
        rows={10}
        rowsPerPageOptions={[5, 10, 25, 50]}
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
        currentPageReportTemplate="Mostrando {first} a {last} de {totalRecords} trabajadores"
        emptyMessage="No se encontraron trabajadores"
        dataKey="id"
        stripedRows
        showGridlines
        responsiveLayout="scroll"
        size="normal"
        header={
          <div className="table-header">
            <h3 className="m-0">Listado de Trabajadores</h3>
          </div>
        }
      >
        <Column
          field="id"
          header="ID"
          sortable
          style={{ width: '5%', fontWeight: '600' }}
          alignHeader="center"
          align="center"
        />
        <Column
          field="User.nombre"
          header="Nombre"
          sortable
          style={{ width: '25%' }}
          body={(rowData) => (
            <div className="worker-name">
              <i className="pi pi-user mr-2" style={{ color: 'var(--primary-color)' }}></i>
              <span style={{ fontWeight: '600' }}>{rowData.User?.nombre || '-'}</span>
            </div>
          )}
        />
        <Column 
          field="especialidad" 
          header="Especialidad" 
          sortable 
          style={{ width: '20%' }}
          body={(rowData) => (
            <div className="worker-specialty">
              <i className="pi pi-briefcase mr-2" style={{ color: 'var(--primary-color)' }}></i>
              <span>{rowData.especialidad || '-'}</span>
            </div>
          )}
        />
        <Column 
          field="User.correo" 
          header="Email" 
          sortable 
          style={{ width: '25%' }}
          body={(rowData) => (
            <div className="worker-email">
              <i className="pi pi-envelope mr-2" style={{ color: 'var(--primary-color)' }}></i>
              <span>{rowData.User?.correo || '-'}</span>
            </div>
          )}
        />
        <Column 
          field="activo" 
          header="Estado" 
          sortable 
          style={{ width: '15%' }}
          alignHeader="center"
          align="center"
          body={(rowData) => (
            <span className={`status-badge ${rowData.activo ? 'active' : 'inactive'}`}>
              {rowData.activo ? 'Activo' : 'Inactivo'}
            </span>
          )}
        />
        <Column 
          body={actionBodyTemplate} 
          header="Acciones" 
          style={{ width: '15%', minWidth: '8rem' }}
          alignHeader="center"
          align="center"
        />
      </DataTable>

      <Dialog
        visible={showForm}
        onHide={() => setShowForm(false)}
        header={selectedWorker ? 'Editar Trabajador' : 'Nuevo Trabajador'}
        className="worker-form-dialog"
        modal
        style={{ width: '50vw' }}
      >
        <WorkerForm
          worker={selectedWorker}
          onClose={() => setShowForm(false)}
        />
      </Dialog>

      <ConfirmDialog />
    </div>
  );
};

export default WorkersList;