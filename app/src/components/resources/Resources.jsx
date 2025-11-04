import { useEffect, useState, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { Toast } from 'primereact/toast';
import { ProgressSpinner } from 'primereact/progressspinner';
import { useResources } from '../../context/hooks/useResources';
import Sidebar from '../Sidebar';
import ResourceForm from './ResourceForm';
import '../../layouts/dashboard/dashboard.css';
import './resources-table-center.css';


const Resources = () => {
  const { 
    resources, 
    loading, 
    error, 
    getResources,
    deleteResource 
  } = useResources();
  const [showDialog, setShowDialog] = useState(false);
  const [selectedResource, setSelectedResource] = useState(null);
  const [deleteDialog, setDeleteDialog] = useState({ open: false, resource: null });
  const toast = useRef(null);

  useEffect(() => {
    getResources();
  }, [getResources]);

  return (
    <div className="dashboard-container">
      <Sidebar />
      <main className="main-content">
        <div className="p-4">
          <Toast ref={toast} />
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold">Recursos</h1>
            <Button 
              label="Nuevo Recurso" 
              icon="pi pi-plus" 
              onClick={() => {
                setSelectedResource(null); // Asegura que se abra para crear
                setShowDialog(true);
              }}
            />
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <ProgressSpinner />
            </div>
          ) : error ? (
            <div className="p-4">
              <div className="text-red-500">
                Error al cargar los recursos: {error}
              </div>
            </div>
          ) : (
            <DataTable 
              value={resources} 
              paginator 
              rows={10} 
              rowsPerPageOptions={[5, 10, 25]} 
              className="p-datatable-striped"
            >
              <Column field="id" header="ID" sortable bodyClassName="text-center" />
              <Column field="tipo" header="Tipo" sortable bodyClassName="text-center" />
              <Column field="cantidad" header="Cantidad" sortable bodyClassName="text-center" />
              <Column field="disponible" header="Disponible" body={rowData => rowData.disponible ? 'Sí' : 'No'} sortable bodyClassName="text-center" />
              <Column field="Plot.nombre" header="Parcela" body={rowData => rowData.Plot ? rowData.Plot.nombre : ''} sortable bodyClassName="text-center" />
              <Column field="Plot.tipo_cultivo" header="Cultivo" body={rowData => rowData.Plot ? rowData.Plot.tipo_cultivo : ''} sortable bodyClassName="text-center" />
              <Column field="Plot.estado" header="Estado Parcela" body={rowData => rowData.Plot ? rowData.Plot.estado : ''} sortable bodyClassName="text-center" />
              <Column 
                body={(rowData) => (
                  <div className="flex gap-2 justify-center">
                    <Button
                      icon="pi pi-pencil"
                      className="p-button-rounded p-button-text"
                      style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 0 }}
                      onClick={() => {
                        setSelectedResource(rowData);
                        setShowDialog(true);
                      }}
                    />
                    <Button
                      icon="pi pi-trash"
                      className="p-button-rounded p-button-text p-button-danger"
                      style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 0 }}
                      onClick={() => {
                        setDeleteDialog({ open: true, resource: rowData });
                      }}
                    />
                  </div>
                )}
                header="Acciones"
                bodyClassName="text-center"
              />
            </DataTable>
          )}

          {/* Diálogo del Formulario - MODIFICACIONES CLAVE AQUÍ */}
          <Dialog
            visible={showDialog}
            onHide={() => {
              setShowDialog(false);
              setSelectedResource(null);
            }}
            contentStyle={{ padding: 0 }}
            draggable={false}
            resizable={false}
            modal
          >
            {/* El ResourceForm ahora está centrado gracias a sus estilos internos (margin: '0 auto') */}
            <ResourceForm
              resource={selectedResource}
              onClose={() => {
                setShowDialog(false);
                setSelectedResource(null);
                getResources();
              }}
            />
          </Dialog>

          {/* Diálogo de confirmación para eliminar (sin cambios) */}
          <Dialog
            visible={deleteDialog.open}
            onHide={() => setDeleteDialog({ open: false, resource: null })}
            header="Confirmar eliminación"
            style={{ width: '400px' }}
            footer={
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
                <Button
                  label="Cancelar"
                  className="p-button-text"
                  onClick={() => setDeleteDialog({ open: false, resource: null })}
                />
                <Button
                  label="Eliminar"
                  icon="pi pi-trash"
                  className="p-button-danger"
                  onClick={async () => {
                    try {
                      await deleteResource(deleteDialog.resource.id);
                      toast.current?.show({ severity: 'success', summary: 'Recurso eliminado', life: 2000 });
                    } catch (err) {
                      toast.current?.show({ severity: 'error', summary: 'Error al eliminar', detail: err.message, life: 3000 });
                    } finally {
                      setDeleteDialog({ open: false, resource: null });
                      getResources();
                    }
                  }}
                />
              </div>
            }
          >
            <div className="p-4">
              ¿Seguro que deseas eliminar el recurso <b>{deleteDialog.resource?.tipo}</b>?
            </div>
          </Dialog>
        </div>
      </main>
    </div>
  );
};

export default Resources;