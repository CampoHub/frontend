import { createContext, useState, useCallback } from "react";
import resourcesService from "../services/resources";

export const ResourcesContext = createContext();

export const ResourcesProvider = ({ children }) => {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getResources = useCallback(async () => {
    try {
      setLoading(true);
      const data = await resourcesService.getAll();
      setResources(data);
      setError(null);
    } catch (err) {
      setError('Error al cargar los recursos');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  const createResource = useCallback(async (resourceData) => {
    try {
      setLoading(true);
      const data = await resourcesService.create(resourceData);
      setResources(prev => [...prev, data]);
      setError(null);
      return data;
    } catch (err) {
      setError('Error al crear el recurso');
      console.error(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const updateResource = useCallback(async (id, resourceData) => {
    try {
      setLoading(true);
      const data = await resourcesService.update(id, resourceData);
      setResources(prev => prev.map(resource => 
        resource.id === id ? data : resource
      ));
      setError(null);
      return data;
    } catch (err) {
      setError('Error al actualizar el recurso');
      console.error(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteResource = useCallback(async (id) => {
    try {
      setLoading(true);
      await resourcesService.remove(id);
      setResources(prev => prev.filter(resource => resource.id !== id));
      setError(null);
    } catch (err) {
      setError('Error al eliminar el recurso');
      console.error(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const value = {
    resources,
    loading,
    error,
    getResources,
    createResource,
    updateResource,
    deleteResource
  };

  return (
    <ResourcesContext.Provider value={value}>
      {children}
    </ResourcesContext.Provider>
  );
};
