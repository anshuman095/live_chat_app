import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

const url = "http://192.168.1.4:4001/api";

export const registerUser = createAsyncThunk(
  "/auth/registerUser",
  async ({ username, email, password }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(
        `${url}/user/registerUser`,
        { username, email, password },
        config
      );
      return data;
    } catch (error) {
      if (error.response && error.response?.data?.message) {
        return rejectWithValue(error.response?.data?.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);
