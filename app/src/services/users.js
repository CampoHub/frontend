import api from "./api";

export async function getUsers() {
	const res = await api.get("/users");
	return res.data;
}

export async function updateUser(id, data) {
	const res = await api.put(`/users/${id}`, data);
	return res.data;
}

export async function deleteUser(id) {
	const res = await api.delete(`/users/${id}`);
	return res.data;
}
