import { IContactCreate } from "@/type/IContact";
import api from "./api";

export const getContacts = async () => {
  const response = await api.get("/api/v1/contacts/admin");
  return response.data;
};


export const createContact = async (data:IContactCreate) => {
  const response = await api.post("/api/v1/contacts",data,{
    headers:{
        "Content-Type": "application/json"
    }
  });
  return response.data;
};