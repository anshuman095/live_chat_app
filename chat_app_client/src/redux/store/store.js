import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import registerReducer from "../features/auth/registerSlice";
import themeSliceReducer from "../features/themeSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    register: registerReducer,
    themeKey: themeSliceReducer,
  },
});
