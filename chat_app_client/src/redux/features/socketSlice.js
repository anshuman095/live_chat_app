import { createSlice } from "@reduxjs/toolkit";
import { socketConnection } from "../actions/socketAction";

const initialState = {
  loading: false,
  socket: null,
  onlineUsers: [],
  error: null,
  success: false,
};

const socketSlice = createSlice({
  name: "socket",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(socketConnection.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(socketConnection.fulfilled, (state, { payload }) => {
        console.log("payload in socket", payload);
        state.loading = false;
        state.success = true;
        state.socket = payload;
      })
      .addCase(socketConnection.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });
  },
});

export default socketSlice.reducer;
