import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { buildQueries } from "@testing-library/react";
import { IUser } from "../../models/IUser";
import {
  loginService,
  logoutService,
  registrationService,
} from "../../services/AuthService";

interface AuthUserInitialState {
  email: string;
  isActivated: false;
  id: string;
  isAuth?: boolean;
  isLoading?: boolean;
  error?: string | Error;
}
const authUserInitialState: AuthUserInitialState = {
  email: "",
  isActivated: false,
  id: "",
  isAuth: false,
  isLoading: false,
  error: undefined,
};

interface UsersInitialState<T = object> {
  users: Array<T>;
  isLoading?: boolean;
  error?: string | Error;
}
const usersInitialState: UsersInitialState = {
  users: [],
  isLoading: false,
  error: undefined,
};

interface UserStore {
  authUser: AuthUserInitialState;
  users: UsersInitialState;
}
const userInitialState: UserStore = {
  authUser: authUserInitialState,
  users: usersInitialState,
};

interface LoginResponse {}
interface LoginRequest {
  email: string;
  password: string;
}

interface RegistrationResponse {
  // user: IUser;
  // accessToken: string;
  // refreshToken: string;
}
interface RegistrationRequest {
  email: string;
  password: string;
}

const login = createAsyncThunk<LoginResponse, LoginRequest>(
  "auth/login",
  async (body) => {
    const { email, password } = body;
    console.log(body);
    const response = await loginService(email, password);
    console.log(response.data.user);
    localStorage.setItem("token", response.data.accessToken);
    return response.data.user;
  }
);

const registration = createAsyncThunk<
  RegistrationResponse,
  RegistrationRequest
>("auth/registration", async (body) => {
  const { email, password } = body;
  const response = await registrationService(email, password);
  console.log(response);
  localStorage.setItem("token", response.data.accessToken);
  return response.data.user;
});

const logout = createAsyncThunk("auth/logout", async () => {
  const response = await logoutService();
  console.log(response);
  localStorage.removeItem("token");
});

const userSlice = createSlice({
  name: "user",
  initialState: userInitialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(registration.pending, (store) => {
      store.authUser.isLoading = true;
    });
    builder.addCase(registration.fulfilled, (store, action) => {
      store.authUser.isLoading = false;
      store.authUser.error = undefined;
      store.authUser.isAuth = true;
      store.authUser = { ...store.authUser, ...action.payload };
      console.log(store.authUser);
    });
    builder.addCase(registration.rejected, (store) => {
      store.authUser.isLoading = false;
      console.warn("Failed to register");
    });

    builder.addCase(login.pending, (store) => {
      store.authUser.isLoading = true;
    });
    builder.addCase(login.fulfilled, (store, action) => {
      store.authUser.isLoading = false;
      store.authUser.error = undefined;
      store.authUser.isAuth = true;
      store.authUser = { ...store.authUser, ...action.payload };
      console.log(store.authUser);
    });
    builder.addCase(login.rejected, (store) => {
      store.authUser.isLoading = false;
      console.warn("Failed to login");
    });

    builder.addCase(logout.pending, (store) => {
      store.authUser.isLoading = true;
    });
    builder.addCase(logout.fulfilled, (store) => {
      store.authUser.isLoading = false;
      store.authUser.error = undefined;
      store.authUser.isAuth = false;
    });
    builder.addCase(logout.rejected, (store) => {
      store.authUser.isLoading = false;
      console.warn("Failed to logout");
    });
  },
});

export const userActions = {
  ...userSlice.actions,
  login,
  registration,
  logout,
};

export default userSlice.reducer;
