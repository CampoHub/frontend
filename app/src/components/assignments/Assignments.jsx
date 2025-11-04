import { useContext, useState, useEffect } from 'react';
import { AssignmentsContext } from '../../context/AssignmentsContext';
import AssignmentList from './AssignmentList';
import AssignmentForm from './AssignmentForm';
import AssignmentDetails from './AssignmentDetails';
import AssignmentFilters from './AssignmentFilters';
import Modal from '../common/Modal';
import Sidebar from '../Sidebar';
import '../../layouts/dashboard/dashboard.css';

const Assignments = () => {
  const { assignments, loading, error, getAssignments } = useContext(AssignmentsContext);
  const [showForm, setShowForm] = useState(false);
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    getAssignments();
  }, [getAssignments]);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleShowForm = () => {
    setSelectedAssignment(null);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setSelectedAssignment(null);
  };

  const handleSelectAssignment = (assignment) => {
    setSelectedAssignment(assignment);
    setShowForm(false);
  };

  const handleEditAssignment = (assignment) => {
    setSelectedAssignment(assignment);
    setShowForm(true);
  };

  return (
    <div className="dashboard-container">
      <Sidebar sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      <main className="main-content">
        <div className="content-header">
          <div className="header-main">
            <div className="header-title">
              <h1>Gestión de Asignaciones</h1>
              <button
                className="btn btn-primary"
                onClick={handleShowForm}
              >
                <i className="pi pi-plus" style={{ marginRight: '0.5rem' }}></i>
                Nueva Asignación
              </button>
            </div>
          </div>

          <div className="filters-section">
            <AssignmentFilters />
          </div>
        </div>

        {loading ? (
          <div className="loading">Cargando asignaciones...</div>
        ) : error ? (
          <div className="error-message">{error}</div>
        ) : (
          <div className="dashboard-grid">
            <div className="card list-card">
              <h2>Asignaciones</h2>
              <AssignmentList
                assignments={assignments}
                onSelectAssignment={handleSelectAssignment}
                onEditAssignment={handleEditAssignment}
              />
            </div>

            {selectedAssignment && !showForm && (
              <div className="card details-card">
                <h2>Detalles de la Asignación</h2>
                <AssignmentDetails
                  assignment={selectedAssignment}
                  onEdit={() => handleEditAssignment(selectedAssignment)}
                />
              </div>
            )}
          </div>
        )}
      </main>

      <Modal 
        isOpen={showForm} 
        onClose={handleCloseForm}
        title={selectedAssignment ? 'Editar Asignación' : 'Nueva Asignación'}
      >
        <AssignmentForm
          assignment={selectedAssignment}
          onClose={handleCloseForm}
        />
      </Modal>
    </div>
  );
};

export default Assignments;