import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { Base_Url } from "../../utils/api";

export const userLogin = createAsyncThunk(
  "/auth/userLogin",
  async ({ username, password }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(
        `${Base_Url}/user/loginUser`,
        { username, password },
        config
      );
      return data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const getAllUsers = createAsyncThunk(
  "/auth/getAllUsers",
  async (token, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      };
      const { data } = await axios.get(
        `${Base_Url}/user/getAllUsers`,
        config
      );
      return data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);
