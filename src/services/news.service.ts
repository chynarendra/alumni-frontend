import { INews, INewsCreate } from "@/type/INews";
import api from "./api";

export const getNews = async () => {
  const response = await api.get("/api/v1/news");
  return response.data;
};

export const createNews = async (data:FormData) => {
  const response = await api.post("/api/v1/news",data,{
    headers:{
        "Content-Type": "multipart/form-data"
    }
  });
  return response.data;
};

export const updateNews = async (id:string,data:FormData) => {
  const response = await api.put("/api/v1/news/"+id,data,{
    headers:{
        "Content-Type": "multipart/form-data"
    }
  });
  return response.data;
};

export const deleteNewsData = async (id:string) => {
  const response = await api.delete("/api/v1/news/"+id,{
    headers:{
        "Content-Type": "application/json"
    }
  });
  return response.data;
};

export const getNewsById = async (id:string) => {
  const response = await api.get("/api/v1/news/"+id,{
    headers:{
        "Content-Type": "application/json"
    }
  });
  return response.data;
};