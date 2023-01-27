import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import { IUser } from "../../models/IUser";
import { loginService } from "../../services/AuthService";

const initialState: IUser = {
  email: "",
  id: "",
  isActivated: false,
  // isLoading: false,
};

interface LoginResponse extends IUser {}

interface LoginRequest {
  email: string;
  password: string;
}

const login = createAsyncThunk<LoginResponse, LoginRequest>(
  "auth/login",
  async (body) => {
    const { email, password } = body;
    // try {
    console.log(body);

    const response = await loginService(email, password);
    console.log(response.data.user);
    localStorage.setItem("token", response.data.accessToken);
    return response.data.user;
    // } catch (e: any) {
    //   console.log("login error");
    //   console.log(e.response?.data?.message);
    // }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (bulilder) => {
    bulilder.addCase(login.pending, (store) => {});
    bulilder.addCase(login.fulfilled, (store, { payload }) => {
      // store = payload.user;
      Object.assign(store, payload);
      console.log(payload);
      console.log(store);
    });
    bulilder.addCase(login.rejected, (store) => {});
  },
});

export const userActions = {
  ...userSlice.actions,
  login,
};

export default userSlice.reducer;
