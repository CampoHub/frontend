import { useEffect, useState, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { Toast } from 'primereact/toast';
import { ProgressSpinner } from 'primereact/progressspinner';
import { useResources } from '../../context/hooks/useResources';

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
  const toast = useRef(null);

  useEffect(() => {
    getResources();
  }, [getResources]);

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
          Error al cargar los recursos: {error}
        </div>
      </div>
    );
  }

  return (
    <div className="p-4">
      <Toast ref={toast} />
      
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Recursos</h1>
        <Button 
          label="Nuevo Recurso" 
          icon="pi pi-plus" 
          onClick={() => setShowDialog(true)}
        />
      </div>

      <DataTable 
        value={resources} 
        paginator 
        rows={10} 
        rowsPerPageOptions={[5, 10, 25]} 
        className="p-datatable-striped"
      >
        <Column field="id" header="ID" sortable />
        <Column field="name" header="Nombre" sortable />
        <Column field="type" header="Tipo" sortable />
        <Column field="quantity" header="Cantidad" sortable />
        <Column field="status" header="Estado" sortable />
        <Column 
          body={(rowData) => (
            <div className="flex gap-2">
              <Button 
                icon="pi pi-pencil" 
                className="p-button-rounded p-button-text" 
                onClick={() => {
                  setSelectedResource(rowData);
                  setShowDialog(true);
                }}
              />
              <Button 
                icon="pi pi-trash" 
                className="p-button-rounded p-button-text p-button-danger" 
                onClick={() => {
                  // TODO: Implementar eliminación
                }}
              />
            </div>
          )}
          header="Acciones" 
        />
      </DataTable>

      <Dialog
        visible={showDialog}
        onHide={() => {
          setShowDialog(false);
          setSelectedResource(null);
        }}
        header={selectedResource ? "Editar Recurso" : "Nuevo Recurso"}
        style={{ width: '50vw' }}
      >
        <div className="p-4">
          <p>Formulario de recursos - En construcción</p>
        </div>
      </Dialog>
    </div>
  );
};

export default Resources;