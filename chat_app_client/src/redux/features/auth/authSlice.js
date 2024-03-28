import { createSlice } from "@reduxjs/toolkit";
import { getAllUsers, userLogin } from "../../actions/authAction";

const initialState = {
  loading: false,
  userInfo: null,
  error: null,
  success: false,
  allUserDetails: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetUserInfo: (state) => {
      state.userInfo = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(userLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(userLogin.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.userInfo = payload?.data;
      })
      .addCase(userLogin.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });
    builder
      .addCase(getAllUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllUsers.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.allUserDetails = payload;
      })
      .addCase(getAllUsers.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });
  },
});
export const { resetUserInfo } = authSlice.actions;
export default authSlice.reducer;
