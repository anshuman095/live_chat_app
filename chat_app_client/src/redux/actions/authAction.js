import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

const url = "http://192.168.1.6:4001/api";

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
        `${url}/user/loginUser`,
        { username, password },
        config
      );
      // localStorage.setItem("token", data.token);
      // console.log("data", data);
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

// export const registerUser = createAsyncThunk(
//   "/",
//   async ({ name, email, password }, { rejectWithValue }) => {
//     try {
//       const config = {
//         headers: {
//           "Content-Type": "application/json",
//         },
//       };
//       const data = await axios.post(
//         `${url}/user/registerUser`,
//         { name, email, password },
//         config
//       );
//       return data;
//     } catch (error) {
//       if (error.response && error.response?.data?.message) {
//         return rejectWithValue(error.response?.data?.message);
//       } else {
//         return rejectWithValue(error.message);
//       }
//     }
//   }
// );
