import api from './api';

export const getAllWorkers = async () => {
  try {
    const response = await api.get('/workers');
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createWorker = async (workerData) => {
  try {
    const response = await api.post('/workers', workerData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateWorker = async (id, workerData) => {
  try {
    const response = await api.put(`/workers/${id}`, workerData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteWorker = async (id) => {
  try {
    const response = await api.delete(`/workers/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
