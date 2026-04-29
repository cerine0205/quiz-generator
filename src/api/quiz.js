import api from "./axios";

export const generateQuiz = (chatId, data) =>
  api.post(`/chats/${chatId}/generate`, data);

export const generateGuestQuiz = (data) =>
  api.post("/guest/generate", data);

export const generatePlan = (data) =>
  api.post("/plan", data);
