import { useContext, useState, useEffect } from 'react';
import { WorkersContext } from '../context/WorkersContext';
import WorkersList from './workers/WorkersList';
import WorkerForm from './workers/WorkerForm';
import Sidebar from './Sidebar';
import Modal from './common/Modal';
import '../layouts/dashboard/dashboard.css';

const Workers = () => {
  const { workers, loading, error, fetchWorkers } = useContext(WorkersContext);
  const [showForm, setShowForm] = useState(false);
  const [selectedWorker, setSelectedWorker] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    fetchWorkers();
  }, [fetchWorkers]);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleShowForm = () => {
    setSelectedWorker(null);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setSelectedWorker(null);
  };

  const handleEditWorker = (worker) => {
    setSelectedWorker(worker);
    setShowForm(true);
  };

  return (
    <div className="dashboard-container">
      <Sidebar sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      <main className="main-content">
        <div className="content-header">
          <div className="header-main">
            <div className="header-title">
              <h1>Gestión de Trabajadores</h1>
              <button
                className="btn btn-primary"
                onClick={handleShowForm}
              >
                <i className="pi pi-plus" style={{ marginRight: '0.5rem' }}></i>
                Nuevo Trabajador
              </button>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="loading">Cargando trabajadores...</div>
        ) : error ? (
          <div className="error-message">{error}</div>
        ) : (
          <div className="dashboard-grid">
            <div className="card list-card">
              <h2>Trabajadores</h2>
              <WorkersList
                workers={workers}
                onEditWorker={handleEditWorker}
              />
            </div>
          </div>
        )}
      </main>

      <Modal 
        isOpen={showForm} 
        onClose={handleCloseForm}
        title={selectedWorker ? 'Editar Trabajador' : 'Nuevo Trabajador'}
      >
        <WorkerForm
          worker={selectedWorker}
          onClose={handleCloseForm}
        />
      </Modal>
    </div>
  );
};

export default Workers;