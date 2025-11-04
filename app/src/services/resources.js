import api from './api';

const resourcesService = {
    getAll: async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await api.get('/resources', {
                headers: { Authorization: `Bearer ${token}` }
            });
            return response.data;
        } catch (error) {
            throw error.response?.data || { error: 'Error al obtener los recursos' };
        }
    },

    create: async (data) => {
        try {
            const token = localStorage.getItem('token');
            const response = await api.post('/resources', data, {
                headers: { Authorization: `Bearer ${token}` }
            });
            return response.data;
        } catch (error) {
            throw error.response?.data || { error: 'Error al crear el recurso' };
        }
    },

    update: async (id, data) => {
        try {
            const token = localStorage.getItem('token');
            const response = await api.put(`/resources/${id}`, data, {
                headers: { Authorization: `Bearer ${token}` }
            });
            return response.data;
        } catch (error) {
            throw error.response?.data || { error: 'Error al actualizar el recurso' };
        }
    },

    remove: async (id) => {
        try {
            const token = localStorage.getItem('token');
            const response = await api.delete(`/resources/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            return response.data;
        } catch (error) {
            throw error.response?.data || { error: 'Error al eliminar el recurso' };
        }
    },
};

export default resourcesService;
