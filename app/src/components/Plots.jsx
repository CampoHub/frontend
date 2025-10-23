import { useContext, useState, useEffect } from 'react';
import { PlotsContext } from '../context/PlotsContext';
import PlotList from './plots/PlotList';
import PlotForm from './plots/PlotForm';
import PlotDetails from './plots/PlotDetails';
import Dashboard from '../layouts/dashboard/Dashboard';
import '../layouts/dashboard/dashboard.css';

const Plots = () => {
  const { plots, loading, error, fetchPlots } = useContext(PlotsContext);
  const [showForm, setShowForm] = useState(false);
  const [selectedPlot, setSelectedPlot] = useState(null);

  useEffect(() => {
    fetchPlots();
  }, []);

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

  // Renderiza el contenido de parcelas dentro del layout Dashboard
  return (
    <Dashboard>
      <div className="dashboard-content">
        <div className="dashboard-header">
          <h1>Gestión de Parcelas</h1>
          <button 
            className="btn btn-primary" 
            onClick={handleShowForm}
          >
            Nueva Parcela
          </button>
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

            {showForm ? (
              <div className="card form-card">
                <h2>{selectedPlot ? 'Editar Parcela' : 'Nueva Parcela'}</h2>
                <PlotForm
                  plot={selectedPlot}
                  onClose={handleCloseForm}
                />
              </div>
            ) : selectedPlot ? (
              <div className="card details-card">
                <h2>Detalles de la Parcela</h2>
                <PlotDetails
                  plot={selectedPlot}
                  onEdit={() => handleEditPlot(selectedPlot)}
                />
              </div>
            ) : (
              <div className="card info-card">
                <h2>Información</h2>
                <p>Selecciona una parcela para ver sus detalles o crea una nueva.</p>
                <p>Las parcelas te permiten organizar tus cultivos y trabajadores por áreas de tu campo.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </Dashboard>
  );
};

export default Plots;