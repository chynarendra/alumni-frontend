import api from "./api";

export const getEvents = async () => {
  const response = await api.get("/api/v1/events");
  return response.data;
};

export const createEvent = async (data:FormData) => {
  const response = await api.post("/api/v1/events",data,{
    headers:{
        "Content-Type": "multipart/form-data"
    }
  });
  return response.data;
};

export const updateEvent = async (id:string,data:FormData) => {
  const response = await api.put("/api/v1/events/"+id,data,{
    headers:{
        "Content-Type": "multipart/form-data"
    }
  });
  return response.data;
};

export const deleteEventData = async (id:string) => {
  const response = await api.delete("/api/v1/events/"+id,{
    headers:{
        "Content-Type": "application/json"
    }
  });
  return response.data;
};

export const getEventById = async (id:string) => {
  const response = await api.get("/api/v1/events/"+id,{
    headers:{
        "Content-Type": "application/json"
    }
  });
  return response.data;
};

export const getEventAttendees = async (id:string) => {
  const response = await api.get(`/api/v1/events/${id}/attendees`,{
    headers:{
        "Content-Type": "application/json"
    }
  });
  return response.data;
};

export const bookEvent = async (id:string) => {
  const response = await api.post(`/api/v1/events/${id}/book`,{
    headers:{
        "Content-Type": "application/json"
    }
  });
  return response.data;
};