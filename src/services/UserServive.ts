import instans from "../http";
import { AxiosResponse } from "axios";
import { IUser } from "../types";

export const fetchUsersService = async (): Promise<AxiosResponse<IUser[]>> => {
  return instans.get<IUser[]>("/users");
};
