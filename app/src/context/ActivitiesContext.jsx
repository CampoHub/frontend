import { createContext, useState, useEffect, useCallback } from "react";
import activitiesService from "../services/activities";

export const ActivitiesContext = createContext();

export const ActivitiesProvider = ({ children }) => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getActivities = useCallback(async () => {
    try {
      setLoading(true);
      const data = await activitiesService.getAll();
      setActivities(data);
      setError(null);
    } catch (err) {
      setError("Error al cargar las actividades");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  const addActivity = async (activityData) => {
    try {
      setLoading(true);
      const data = await activitiesService.create(activityData);
      setActivities(prev => [...prev, data]);
      setError(null);
      return data;
    } catch (err) {
      setError("Error al crear la actividad");
      console.error(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateActivity = async (id, activityData) => {
    try {
      setLoading(true);
      const data = await activitiesService.update(id, activityData);
      setActivities(prev => 
        prev.map(activity => activity.id === id ? data : activity)
      );
      setError(null);
      return data;
    } catch (err) {
      setError("Error al actualizar la actividad");
      console.error(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const removeActivity = async (id) => {
    try {
      setLoading(true);
      await activitiesService.remove(id);
      setActivities(prev => prev.filter(activity => activity.id !== id));
      setError(null);
    } catch (err) {
      setError("Error al eliminar la actividad");
      console.error(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getActivities();
  }, [getActivities]);

  return (
    <ActivitiesContext.Provider
      value={{
        activities,
        loading,
        error,
        getActivities,
        addActivity,
        updateActivity,
        removeActivity
      }}
    >
      {children}
    </ActivitiesContext.Provider>
  );
};