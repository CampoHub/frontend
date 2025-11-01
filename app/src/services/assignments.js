import api from './api';

export const assignmentService = {
  // Obtener todas las asignaciones
  getAllAssignments: async () => {
    try {
      const response = await api.get('/assignments');
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Obtener asignaciones de una actividad
  getAssignments: async (activityId) => {
    try {
      const response = await api.get(`/activities/${activityId}/assignments`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Asignar trabajador a una actividad
  assignWorker: async (activityId, data) => {
    try {
      const response = await api.post(`/activities/${activityId}/assignments`, data);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Desasignar trabajador de una actividad
  unassignWorker: async (assignmentId, data) => {
    try {
      const response = await api.put(`/activity-assignments/${assignmentId}/unassign`, data);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Eliminar asignación
  deleteAssignment: async (assignmentId) => {
    try {
      await api.delete(`/activity-assignments/${assignmentId}`);
      return true;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }
};