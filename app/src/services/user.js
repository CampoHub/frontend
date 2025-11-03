import api from "./api";

const userService = {
    getUserProfile: () => api.get("/api/profile"),
    updateProfile: (userData) => api.put("/api/profile", userData),
    changePassword: (passwordData) => api.put("/api/profile/change-password", passwordData)
};

export default userService;