import axios from "axios";

const BASE_URL = "http://localhost:3000/assignments";

const assignmentService = {
  getAllAssignments() {
    return axios.get(BASE_URL);
  },

  getByActivity(activityId) {
    return axios.get(`${BASE_URL}/activity/${activityId}`);
  },

  createAssignment(payload) {
    return axios.post(BASE_URL, payload);
  },

  updateAssignment(id, payload) {
    return axios.put(`${BASE_URL}/${id}`, payload);
  },

  deleteAssignment(id) {
    return axios.delete(`${BASE_URL}/${id}`);
  }
};

export default assignmentService;
