import api from "./axios";

export const generateQuiz = (chatId, data) =>
  api.post(`/chats/${chatId}/generate`, data);

export const generateGuestQuiz = (data) =>
  api.post("/guest/generate", data);