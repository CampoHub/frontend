import { useContext, useState } from 'react';
import { ActivitiesContext } from '../context/ActivitiesContext';
import ActivityList from './activities/ActivityList';
import ActivityForm from './activities/ActivityForm';
import ActivityDetails from './activities/ActivityDetails';
import Sidebar from './Sidebar';
import '../layouts/dashboard/dashboard.css';

const Activities = () => {
  const { activities, loading, error } = useContext(ActivitiesContext);
  const [showForm, setShowForm] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);

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
          <h1>Gestión de Actividades</h1>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <button className="btn btn-primary" onClick={handleShowForm}>
              Nueva Actividad
            </button>
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

            {showForm ? (
              <div className="card form-card">
                <h2>{selectedActivity ? 'Editar Actividad' : 'Nueva Actividad'}</h2>
                <ActivityForm
                  activity={selectedActivity}
                  onClose={handleCloseForm}
                />
              </div>
            ) : selectedActivity ? (
              <div className="card details-card">
                <h2>Detalles de la Actividad</h2>
                <ActivityDetails
                  activity={selectedActivity}
                  onEdit={() => handleEditActivity(selectedActivity)}
                />
              </div>
            ) : (
              <div className="card info-card">
                <h2>Información</h2>
                <p>Selecciona una actividad para ver sus detalles o crea una nueva.</p>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default Activities;