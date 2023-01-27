import axios, { AxiosError } from "axios";
import { makeAutoObservable } from "mobx";
import { API_URL } from "../http";
import { IUser } from "../models/IUser";
import { AuthResponse } from "../models/response/AuthResponse";
import {
  loginService,
  registrationService,
  logoutService,
} from "../services/AuthService";

export default class Store {
  user = {} as IUser;
  isAuth = false;
  isLoading = false;

  constructor() {
    makeAutoObservable(this);
  }

  setAuth(bool: boolean) {
    this.isAuth = bool;
  }

  setUser(user: IUser) {
    this.user = user;
  }

  setLoading(bool: boolean) {
    this.isLoading = bool;
  }

  //actions:
  async login(email: string, password: string) {
    try {
      const response = await loginService(email, password);
      console.log(response);
      localStorage.setItem("token", response.data.accessToken);
      this.setAuth(true);
      this.setUser(response.data.user);
    } catch (e: any) {
      console.log("login error");
      console.log(e.response?.data?.message);
    }
  }

  async registration(email: string, password: string) {
    try {
      const response = await registrationService(email, password);
      console.log(response);
      localStorage.setItem("token", response.data.accessToken);
      this.setAuth(true);
      this.setUser(response.data.user);
    } catch (e: any) {
      console.log("registration error");
      console.log(e?.response?.data?.message);
    }
  }

  async logout() {
    try {
      const response = await logoutService();
      console.log(response);
      localStorage.removeItem("token");
      this.setAuth(false);
    } catch (e: any) {
      console.log({} as IUser);
    }
  }

  async checkAuth() {
    this.isLoading = true;
    try {
      const response = await axios.get<AuthResponse>(`${API_URL}/refresh`, {
        withCredentials: true,
      });
      console.log(response);
      localStorage.setItem("token", response.data.accessToken);
      this.setAuth(true);
      this.setUser(response.data.user);
    } catch (e: any) {
      console.log(e.response?.data?.message);
    } finally {
      this.isLoading = false;
    }
  }
}
