import api from './api';

const activitiesService = {
    getAll: () => {
        return api.get('/activities')
            .then(res => res.data);
    },

    create: (data) => {
        return api.post('/activities', data)
            .then(res => res.data);
    },

    update: (id, data) => {
        return api.put(`/activities/${id}`, data)
            .then(res => res.data);
    },

    remove: (id) => {
        return api.delete(`/activities/${id}`)
            .then(res => res.data);
    }
};

export default activitiesService;