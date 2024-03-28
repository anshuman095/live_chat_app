import { createSlice } from "@reduxjs/toolkit";
import { registerUser } from "../../actions/registerAction";

const initialState = {
  loading: false,
  userInfo: null,
  error: null,
  success: false,
};

const registerSlice = createSlice({
  name: "register",
  initialState,
  reducers: {
    resetUserLoginInfo: (state) => {
      state.userInfo = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.success = true;
        state.userInfo = payload?.success ? payload.message : null;
      })
      .addCase(registerUser.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });
  },
});

export const { resetUserLoginInfo } = registerSlice.actions;


export default registerSlice.reducer;