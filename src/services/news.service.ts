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