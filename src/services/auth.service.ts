// services/authService.ts
import { ISignUpUser } from "@/type/ISignUp";
import api from "./api";
import { ISignInUser } from "@/type/ISignIn";

export const signUp = async (userData: ISignUpUser) => {
  const response = await api.post("/api/v1/auth/signup", userData);
  return response.data;
};

export const signIn = async (userData: ISignInUser) => {
  const response = await api.post("/api/v1/auth/login", userData); // Adjust endpoint if needed
  return response.data;
};
