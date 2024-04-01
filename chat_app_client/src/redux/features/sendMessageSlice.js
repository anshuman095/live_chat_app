import { createSlice } from "@reduxjs/toolkit";
import { getMessages, sendMessage } from "../actions/sendMessageAction";

const initialState = {
  loading: false,
  messageData: null,
  conversationData: null,
  error: null,
  success: false,
};

const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(sendMessage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sendMessage.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.success = true;
        state.messageData = payload;
      })
      .addCase(sendMessage.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });
    builder
      .addCase(getMessages.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getMessages.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.success = true;
        state.conversationData = payload;
      })
      .addCase(getMessages.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });
  },
});

export default messageSlice.reducer;
