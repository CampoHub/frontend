import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import plotsService from "../services/plots";

export const PlotsContext = createContext();

export const PlotsProvider = ({ children }) => {
  const [plots, setPlots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Estado para los filtros
  const [filters, setFilters] = useState({
    tipo_cultivo: '',
    estado: ''
  });
  
  const navigate = useNavigate();

  const fetchPlots = async () => {
    try {
      setLoading(true);
      const data = await plotsService.getAll();
      setPlots(data);
      setError(null);
    } catch (err) {
      setError("Error al cargar las parcelas");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Crear una nueva parcela
  const addPlot = async (plotData) => {
    try {
      setLoading(true);
      const data = await plotsService.create(plotData);
      setPlots((prev) => [...prev, data]);
      setError(null);
      return data;
    } catch (err) {
      setError("Error al crear la parcela");
      console.error(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Actualizar una parcela existente
  const updatePlot = async (id, plotData) => {
    try {
      setLoading(true);
      const data = await plotsService.update(id, plotData);
      setPlots((prev) => prev.map((plot) => (plot.id === id ? data : plot)));
      setError(null);
      return data;
    } catch (err) {
      setError("Error al actualizar la parcela");
      console.error(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Eliminar una parcela
  const removePlot = async (id) => {
    try {
      setLoading(true);
      await plotsService.remove(id);
      setPlots((prev) => prev.filter((plot) => plot.id !== id));
      setError(null);
    } catch (err) {
      setError("Error al eliminar la parcela");
      console.error(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Obtener una parcela por ID
  const getPlotById = (id) => {
    return plots.find((plot) => plot.id === id) || null;
  };

  // Actualizar filtros
  const updateFilters = (newFilters) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      ...newFilters
    }));
  };

  // Obtener parcelas filtradas
  const getFilteredPlots = () => {
    return plots.filter(plot => {
      const matchesTipoCultivo = !filters.tipo_cultivo || plot.tipo_cultivo === filters.tipo_cultivo;
      const matchesEstado = !filters.estado || plot.estado === filters.estado;
      return matchesTipoCultivo && matchesEstado;
    });
  };

  useEffect(() => {
    fetchPlots();
  }, []);

  return (
    <PlotsContext.Provider
      value={{
        plots: getFilteredPlots(), // Ahora devolvemos las parcelas filtradas
        loading,
        error,
        filters,
        fetchPlots,
        addPlot,
        updatePlot,
        removePlot,
        getPlotById,
        updateFilters
      }}
    >
      {children}
    </PlotsContext.Provider>
  );
};