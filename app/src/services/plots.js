import api from './api';

const plotsService = {
    getAll: async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await api.get('/plots', {
                headers: { Authorization: `Bearer ${token}` }
            });
            return response.data;
        } catch (error) {
            throw error.response?.data || { error: 'Error al obtener las parcelas' };
        }
    },

    create: async (data) => {
        try {
            const token = localStorage.getItem('token');
            const response = await api.post('/plots', data, {
                headers: { Authorization: `Bearer ${token}` }
            });
            return response.data;
        } catch (error) {
            throw error.response?.data || { error: 'Error al crear la parcela' };
        }
    },

    update: async (id, data) => {
        try {
            const token = localStorage.getItem('token');
            const response = await api.put(`/plots/${id}`, data, {
                headers: { Authorization: `Bearer ${token}` }
            });
            return response.data;
        } catch (error) {
            throw error.response?.data || { error: 'Error al actualizar la parcela' };
        }
    },

    remove: async (id) => {
        try {
            const token = localStorage.getItem('token');
            const response = await api.delete(`/plots/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            return response.data;
        } catch (error) {
            throw error.response?.data || { error: 'Error al eliminar la parcela' };
        }
    },
};

export default plotsService;