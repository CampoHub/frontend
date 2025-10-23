import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import plotsService from "../services/plots";

export const PlotsContext = createContext();

export const PlotsProvider = ({ children }) => {
  const [plots, setPlots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
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


  useEffect(() => {
    fetchPlots();
  }, []);

  return (
    <PlotsContext.Provider
      value={{
        plots,
        loading,
        error,
        fetchPlots,
        addPlot,
        updatePlot,
        removePlot,
        getPlotById,
      }}
    >
      {children}
    </PlotsContext.Provider>
  );
};