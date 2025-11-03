import api from "./api";

export const assignmentService = {
  getAll: async () => {
    const r = await api.get("/assignments");
    return r.data;
  },
  getByActivity: async (activityId) => {
    const r = await api.get(`/assignments/activity/${activityId}`);
    return r.data;
  },
  create: async (payload) => {
    const r = await api.post("/assignments", payload);
    return r.data;
  },
  update: async (id, payload) => {
    const r = await api.put(`/assignments/${id}`, payload);
    return r.data;
  },
  unassign: async (id, payload) => {
    const r = await api.put(`/assignments/${id}/unassign`, payload);
    return r.data;
  },
  remove: async (id) => {
    await api.delete(`/assignments/${id}`);
    return true;
  },
};
