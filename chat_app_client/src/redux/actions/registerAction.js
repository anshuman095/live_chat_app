import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { Base_Url } from "../../utils/api";

export const registerUser = createAsyncThunk(
  "/auth/registerUser",
  async ({ username, fullName, email, password, gender }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(
        `${Base_Url}/user/registerUser`,
        { username, fullName, email, password, gender },
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