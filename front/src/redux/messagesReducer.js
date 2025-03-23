import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const sendMessage = createAsyncThunk(
  'messages/sendMessage',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/messages/${payload.roomId}/create`,
        { content: payload.content },
        { withCredentials: true }
      );
      return response.data.message;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'メッセージの送信に失敗しました');
    }
  }
);

export const getMessages = createAsyncThunk(
  'messages/getMessages',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/messages/${payload.roomId}`, { withCredentials: true });
      return response.data.messages;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'メッセージの取得に失敗しました');
    }
  }
);

export const updateMessage = createAsyncThunk(
  'messages/updateMessage',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axios.patch(`${process.env.REACT_APP_API_URL}/messages/${payload.id}`, { content: payload.content }, { withCredentials: true });
      return response.data.message;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'メッセージの編集に失敗しました');
    }
  }
);

// # メッセージを削除するためのdeleteMessageアクションを作成
export const deleteMessage = createAsyncThunk(
  'messages/deleteMessage',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`${process.env.REACT_APP_API_URL}/messages/${payload.msgId}`, { withCredentials: true });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'メッセージの削除に失敗しました');
    }
  }
);

const messagesSlice = createSlice({
  name: 'messages',
  initialState: {
    messages: [],
    loading: false,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(sendMessage.fulfilled, (state, action) => {
        state.messages.push(action.payload);
        state.loading = false;
        state.error = null;
      })
      .addCase(sendMessage.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sendMessage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getMessages.fulfilled, (state, action) => {
        state.loading = false;
        state.messages = action.payload;
      })
      .addCase(getMessages.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getMessages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateMessage.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.messages.push(action.payload);
      })
      .addCase(updateMessage.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateMessage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // # メッセージの削除が成功した時の状態
      .addCase(deleteMessage.fulfilled, (state, action) => {
        state.messages = state.messages.filter((message) => message.id !== action.payload.messageId);
        state.loading = false;
        state.error = null;
      })
      // # メッセージの削除がローディング中の時の状態
      .addCase(deleteMessage.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      // # メッセージの削除が失敗した時の状態
      .addCase(deleteMessage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
  }
});

export default messagesSlice.reducer;