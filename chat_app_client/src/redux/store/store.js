import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import authReducer from "../features/auth/authSlice";
import registerReducer from "../features/auth/registerSlice";
import messageReducer from "../features/sendMessageSlice";
import socketReducer from "../features/socketSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  register: registerReducer,
  message: messageReducer,
  socket: socketReducer,
});

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: true,
});

export const persistor = persistStore(store);
