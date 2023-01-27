import { combineReducers } from "redux";

import userSlice from "./user.reducer";

export const rootReducer = combineReducers({
  user: userSlice,
});
