import { useContext, useState, useEffect } from 'react';
import { PlotsContext } from '../context/PlotsContext';
import PlotList from './plots/PlotList';
import PlotForm from './plots/PlotForm';
import PlotDetails from './plots/PlotDetails';
import PlotFilters from './plots/PlotFilters';
import Modal from './common/Modal';
import Sidebar from './Sidebar';
import '../layouts/dashboard/dashboard.css';
import { Link } from 'react-router-dom';

const Plots = () => {
  const { plots, loading, error, fetchPlots } = useContext(PlotsContext);
  const [showForm, setShowForm] = useState(false);
  const [selectedPlot, setSelectedPlot] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    fetchPlots();
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleShowForm = () => {
    setSelectedPlot(null);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setSelectedPlot(null);
  };

  const handleSelectPlot = (plot) => {
    setSelectedPlot(plot);
    setShowForm(false);
  };

  const handleEditPlot = (plot) => {
    setSelectedPlot(plot);
    setShowForm(true);
  };

  return (
    <div className="dashboard-container">
      <Sidebar sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      <main className="main-content">
        <div className="content-header">
          <div className="header-main">
            <div className="header-title">
              <h1>Gestión de Parcelas</h1>
              <button
                className="btn btn-primary"
                onClick={handleShowForm}
              >
                <i className="pi pi-plus" style={{ marginRight: '0.5rem' }}></i>
                Nueva Parcela
              </button>
            </div>
          </div>

          <div className="filters-section">
            <PlotFilters />
          </div>
        </div>

        {loading ? (
          <div className="loading">Cargando parcelas...</div>
        ) : error ? (
          <div className="error-message">{error}</div>
        ) : (
          <div className="dashboard-grid">
            <div className="card list-card">
              <h2>Parcelas</h2>
              <PlotList
                  plots={plots}
                  onSelectPlot={handleSelectPlot}
                onEditPlot={handleEditPlot}
              />
            </div>

            {selectedPlot && !showForm && (
              <div className="card details-card">
                <h2>Detalles de la Parcela</h2>
                <PlotDetails
                  plot={selectedPlot}
                  onEdit={() => handleEditPlot(selectedPlot)}
                />
              </div>
            )}
          </div>
        )}
      </main>

      <Modal 
        isOpen={showForm} 
        onClose={handleCloseForm}
        title={selectedPlot ? 'Editar Parcela' : 'Nueva Parcela'}
      >
        <PlotForm
          plot={selectedPlot}
          onClose={handleCloseForm}
        />
      </Modal>
    </div>
  );
};

export default Plots;