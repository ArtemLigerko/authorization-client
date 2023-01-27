import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { rootReducer } from "./reducers";

export const storeRedux = configureStore({
  reducer: rootReducer,
});

export type AppDispatch = typeof storeRedux.dispatch;
export type RootState = ReturnType<typeof storeRedux.getState>;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
