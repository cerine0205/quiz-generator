import api from "./axios";

export const getChats = () => api.get("/chats");

export const createChat = (data) => api.post("/chats", data);

export const getChat = (id) => api.get(`/chats/${id}`);

export const deleteChat = (id) => api.delete(`/chats/${id}`);