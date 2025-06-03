import { IContactCreate } from "@/type/IContact";
import api from "./api";

export const getContacts = async () => {
  const response = await api.get("/api/v1/contacts/contacts");
  return response.data;
};

export const getPersonalContacts = async () => {
  const response = await api.get("/api/v1/contacts/personal-contacts");
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

export const deleteContactData = async (id:string) => {
  const response = await api.delete("/api/v1/contacts/delete-contact/"+id,{
    headers:{
        "Content-Type": "application/json"
    }
  });
  return response.data;
};