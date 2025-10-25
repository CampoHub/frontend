import { useEffect, useState, useRef } from "react";
import { getUsers, deleteUser, updateUser } from "../../../services/users";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { Toast } from 'primereact/toast';
import Sidebar from '../../../components/Sidebar';

function UsersAdmin() {
  const [users, setUsers] = useState([]);
  const [editDialog, setEditDialog] = useState(false);
  const [editData, setEditData] = useState({});
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const toast = useRef(null);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const data = await getUsers();
      setUsers(data);
    } catch (error) {
      showError('Error al cargar usuarios');
    }
  };

  const showSuccess = (msg) => {
    toast.current.show({severity:'success', summary: 'Éxito', detail: msg, life: 3000});
  }

  const showError = (msg) => {
    toast.current.show({severity:'error', summary: 'Error', detail: msg, life: 3000});
  }

  const confirmDelete = (id) => {
    confirmDialog({
      message: '¿Estás seguro que deseas eliminar este usuario?',
      header: 'Confirmar Eliminación',
      icon: 'pi pi-exclamation-triangle',
      accept: () => handleDelete(id)
    });
  };

  const handleDelete = async (id) => {
    try {
      await deleteUser(id);
      await fetchUsers();
      showSuccess('Usuario eliminado con éxito');
    } catch (error) {
      showError('Error al eliminar el usuario');
    }
  };

  const handleEdit = (user) => {
    setEditData({ ...user });
    setEditDialog(true);
  };

  const handleEditSave = async () => {
    try {
      await updateUser(editData.id, editData);
      setEditDialog(false);
      await fetchUsers();
      showSuccess('Usuario actualizado con éxito');
    } catch (error) {
      showError('Error al actualizar el usuario');
    }
  };

  const roleOptions = [
    { label: 'Administrador', value: 'admin' },
    { label: 'Gestor', value: 'gestor' },
    { label: 'Trabajador', value: 'trabajador' }
  ];

  const actionBodyTemplate = (rowData) => {
    return (
      <div className="flex gap-2">
        <Button 
          icon="pi pi-pencil" 
          rounded 
          text 
          severity="info" 
          onClick={() => handleEdit(rowData)}
        />
        <Button 
          icon="pi pi-trash" 
          rounded 
          text 
          severity="danger" 
          onClick={() => confirmDelete(rowData.id)}
        />
      </div>
    );
  };

  const renderEditDialog = () => {
    const dialogFooter = (
      <div>
        <Button label="Cancelar" icon="pi pi-times" text onClick={() => setEditDialog(false)} />
        <Button label="Guardar" icon="pi pi-check" severity="success" onClick={handleEditSave} />
      </div>
    );

    return (
      <Dialog
        visible={editDialog}
        style={{ width: '450px' }}
        header="Editar Usuario"
        modal
        className="p-fluid"
        footer={dialogFooter}
        onHide={() => setEditDialog(false)}
      >
        <div className="field mt-4">
          <span className="p-float-label">
            <InputText
              id="nombre"
              value={editData.nombre || ''}
              onChange={(e) => setEditData({ ...editData, nombre: e.target.value })}
            />
            <label htmlFor="nombre">Nombre</label>
          </span>
        </div>
        
        <div className="field mt-4">
          <span className="p-float-label">
            <InputText
              id="correo"
              value={editData.correo || ''}
              onChange={(e) => setEditData({ ...editData, correo: e.target.value })}
            />
            <label htmlFor="correo">Correo</label>
          </span>
        </div>

        <div className="field mt-4">
          <span className="p-float-label">
            <Dropdown
              id="rol"
              value={editData.rol}
              options={roleOptions}
              onChange={(e) => setEditData({ ...editData, rol: e.value })}
            />
            <label htmlFor="rol">Rol</label>
          </span>
        </div>
      </Dialog>
    );
  };

  return (
    <div className="dashboard-container">
      <Sidebar sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      <main className="main-content">
        <div className="content-wrapper p-3">
          <Toast ref={toast} />
          <ConfirmDialog />
          
          <div className="flex justify-content-between align-items-center mb-3">
            <h1 className="text-2xl font-bold m-0">Gestión de Usuarios</h1>
          </div>

          <div className="card shadow-1">
            <DataTable
              value={users}
              paginator
              rows={10}
              rowsPerPageOptions={[5, 10, 25, 50]}
              dataKey="id"
              filters={{}}
              filterDisplay="row"
              loading={false}
              emptyMessage="No se encontraron usuarios"
              className="p-datatable-sm"
              size="small"
            >
              <Column field="id" header="ID" sortable style={{ width: '5%' }} />
              <Column field="nombre" header="Nombre" sortable style={{ width: '30%' }} />
              <Column field="correo" header="Email" sortable style={{ width: '30%' }} />
              <Column field="rol" header="Rol" sortable style={{ width: '20%' }} />
              <Column body={actionBodyTemplate} exportable={false} style={{ width: '15%', minWidth: '100px' }} />
            </DataTable>
          </div>

          {renderEditDialog()}
        </div>
      </main>
    </div>
  );
}

export default UsersAdmin;
