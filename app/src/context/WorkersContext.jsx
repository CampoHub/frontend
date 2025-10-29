import { createContext, useState, useContext, useEffect, useCallback } from 'react';
import { getAllWorkers, createWorker, updateWorker, deleteWorker } from '../services/workers';

export const WorkersContext = createContext();

export const WorkersProvider = ({ children }) => {
  const [workers, setWorkers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadWorkers = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getAllWorkers();
      setWorkers(data);
    } catch (err) {
      setError('No se pudieron cargar los trabajadores');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  const addWorker = async (workerData) => {
    try {
      setError(null);
      const newWorker = await createWorker(workerData);
      setWorkers([...workers, newWorker]);
      return true;
    } catch (err) {
      setError('No se pudo crear el trabajador');
      console.error(err);
      return false;
    }
  };

  const editWorker = async (id, workerData) => {
    try {
      setError(null);
      await updateWorker(id, workerData);
      setWorkers(workers.map(worker => 
        worker.id === id ? { ...worker, ...workerData } : worker
      ));
      return true;
    } catch (err) {
      setError('No se pudo actualizar el trabajador');
      console.error(err);
      return false;
    }
  };

  const removeWorker = async (id) => {
    try {
      setError(null);
      await deleteWorker(id);
      setWorkers(workers.filter(worker => worker.id !== id));
      return true;
    } catch (err) {
      setError('No se pudo eliminar el trabajador');
      console.error(err);
      return false;
    }
  };

  useEffect(() => {
    loadWorkers();
  }, [loadWorkers]);

  return (
    <WorkersContext.Provider 
      value={{
        workers,
        loading,
        error,
        addWorker,
        editWorker,
        removeWorker,
        loadWorkers
      }}
    >
      {children}
    </WorkersContext.Provider>
  );
};

export const useWorkers = () => {
  const context = useContext(WorkersContext);
  if (!context) {
    throw new Error('useWorkers debe ser usado dentro de un WorkersProvider');
  }
  return context;
};
