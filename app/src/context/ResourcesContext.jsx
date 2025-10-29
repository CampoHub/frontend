import { createContext, useState } from "react";
import api from "../services/api";

export const ResourcesContext = createContext();

export const ResourcesProvider = ({ children }) => {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getResources = async () => {
    try {
      setLoading(true);
      const response = await api.get('/resources');
      setResources(response.data);
      setError(null);
    } catch (err) {
      setError('Error al cargar los recursos');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const createResource = async (resourceData) => {
    try {
      setLoading(true);
      const response = await api.post('/resources', resourceData);
      setResources([...resources, response.data]);
      setError(null);
      return response.data;
    } catch (err) {
      setError('Error al crear el recurso');
      console.error(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateResource = async (id, resourceData) => {
    try {
      setLoading(true);
      const response = await api.put(`/resources/${id}`, resourceData);
      setResources(resources.map(resource => 
        resource.id === id ? response.data : resource
      ));
      setError(null);
      return response.data;
    } catch (err) {
      setError('Error al actualizar el recurso');
      console.error(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteResource = async (id) => {
    try {
      setLoading(true);
      await api.delete(`/resources/${id}`);
      setResources(resources.filter(resource => resource.id !== id));
      setError(null);
    } catch (err) {
      setError('Error al eliminar el recurso');
      console.error(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

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
