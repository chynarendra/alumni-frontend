import { IJobCreate } from "@/type/IJob";
import api from "./api";

export const getJobs = async () => {
  const response = await api.get("/api/v1/jobs");
  return response.data;
};

export const createJob = async (data:IJobCreate) => {
  const response = await api.post("/api/v1/jobs",data,{
    headers:{
        "Content-Type": "application/json"
    }
  });
  return response.data;
};

export const updateJob = async (id:string,data:IJobCreate) => {
  const response = await api.put("/api/v1/jobs/"+id,data,{
    headers:{
        "Content-Type": "application/json"
    }
  });
  return response.data;
};

export const deleteJobData = async (id:string) => {
  const response = await api.delete("/api/v1/jobs/"+id,{
    headers:{
        "Content-Type": "application/json"
    }
  });
  return response.data;
};

export const getJobById = async (id:string) => {
  const response = await api.get("/api/v1/jobs/"+id,{
    headers:{
        "Content-Type": "application/json"
    }
  });
  return response.data;
};

export const getJobApplications = async (id:string) => {
  const response = await api.get("/api/v1/jobs/"+id+"/applicantList",{
    headers:{
        "Content-Type": "application/json"
    }
  });
  return response.data;
};

export const applyJob = async (data:FormData,id:string) => {
  const response = await api.post("/api/v1/jobs/"+id+"/apply",data,{
    headers:{
        "Content-Type": "multipart/form-data"
    }
  });
  return response.data;
};