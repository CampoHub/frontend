import { useContext, useState } from 'react';
import { ActivitiesContext } from '../context/ActivitiesContext';
import { useAuth } from '../context/AuthContext';
import ActivityList from './activities/ActivityList';
import ActivityForm from './activities/ActivityForm';
import ActivityDetails from './activities/ActivityDetails';
import Sidebar from './Sidebar';
import '../layouts/dashboard/dashboard.css';

const Activities = () => {
  const { activities, loading, error } = useContext(ActivitiesContext);
  const { user } = useAuth();
  const [showForm, setShowForm] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  
  const isAdmin = user?.role === 'admin';
  const isGestor = user?.role === 'gestor';
  const canEdit = isAdmin || isGestor;

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleShowForm = () => {
    setSelectedActivity(null);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setSelectedActivity(null);
  };

  const handleSelectActivity = (activity) => {
    setSelectedActivity(activity);
    setShowForm(false);
  };

  const handleEditActivity = (activity) => {
    setSelectedActivity(activity);
    setShowForm(true);
  };

  return (
    <div className="dashboard-container">
      <Sidebar sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      <main className="main-content">
        <div className="content-header">
          <div className="header-main">
            <div className="header-title">
              <h1>Gestión de Actividades</h1>
              {canEdit && (
                <button
                  className="btn btn-primary"
                  onClick={handleShowForm}
                >
                  <i className="pi pi-plus" style={{ marginRight: '0.5rem' }}></i>
                  Nueva Actividad
                </button>
              )}
            </div>
          </div>
        </div>

        {loading ? (
          <div className="loading">Cargando actividades...</div>
        ) : error ? (
          <div className="error-message">{error}</div>
        ) : (
          <div className="dashboard-grid">
            <div className="card list-card">
              <h2>Actividades</h2>
              <ActivityList
                activities={activities}
                onSelectActivity={handleSelectActivity}
                onEditActivity={handleEditActivity}
              />
            </div>

            {selectedActivity && !showForm && (
              <div className="card details-card">
                <h2>Detalles de la Actividad</h2>
                <ActivityDetails
                  activity={selectedActivity}
                  onEdit={() => handleEditActivity(selectedActivity)}
                />
              </div>
            )}
          </div>
        )}

        {showForm && (
          <div className="card form-card">
            <h2>{selectedActivity ? 'Editar Actividad' : 'Nueva Actividad'}</h2>
            <ActivityForm
              activity={selectedActivity}
              onClose={handleCloseForm}
            />
          </div>
        )}
      </main>
    </div>
  );
};

export default Activities;