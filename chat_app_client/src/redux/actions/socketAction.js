import { createAsyncThunk } from "@reduxjs/toolkit";
// import { Base_Url } from "../../utils/api";
import io from "socket.io-client";

export const socketConnection = createAsyncThunk(
  "/socket/socketConnection",
  async ({ rejectWithValue }) => {
    try {
      //   const socket = io(`http://192.168.1.6:4001`);
      const socket = io(`http://localhost:4001`);
      return socket;
    } catch (error) {
      if (error.response && error.response?.data?.message) {
        return rejectWithValue(error.response?.data?.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);
