import instans from "../http";
import { AxiosResponse } from "axios";
import { AuthResponse } from "../models/response/AuthResponse";

export const registrationService = async (
  email: string,
  password: string
): Promise<AxiosResponse<AuthResponse>> => {
  return instans.post<AuthResponse>("/registration", { email, password });
};

export const loginService = async (
  email: string,
  password: string
): Promise<AxiosResponse<AuthResponse>> => {
  return instans.post<AuthResponse>("/login", { email, password });
};

export const logoutService = async (): Promise<void> => {
  return instans.post("/logout");
};
