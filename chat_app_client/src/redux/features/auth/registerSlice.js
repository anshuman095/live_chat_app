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
  reducers: {},
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
        localStorage.setItem("userData", JSON.stringify(payload?.message));
        localStorage.setItem("tokenRegister", JSON.stringify(payload?.token));
      })
      .addCase(registerUser.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });
  },
});

export default registerSlice.reducer;
