import api from "./api";

export const getContacts = async () => {
  const response = await api.get("/api/v1/contacts");
  return response.data;
};