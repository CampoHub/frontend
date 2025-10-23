import api from './api';

const token = localStorage.getItem('token');
const plotsService = {
    getAll: () => {
        return api.get('/plots', {
            headers: { Authorization: `Bearer ${token}` }
        }).then(res => res.data);
    },

    create: (data) => {
        return api.post('/plots', data, {
            headers: { Authorization: `Bearer ${token}` }
        }).then(res => res.data);
    },

    update: (id, data) => {
        return api.put(`/plots/${id}`, data, {
            headers: { Authorization: `Bearer ${token}` }
        }).then(res => res.data);
    },

    remove: (id) => {
        return api.delete(`/plots/${id}`, {
            headers: { Authorization: `Bearer ${token}` }
        }).then(res => res.data);
    },
};

export default plotsService;