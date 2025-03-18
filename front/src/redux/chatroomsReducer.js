import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// チャットルーム作成の非同期アクション
export const createChatRoom = createAsyncThunk(
  'chatrooms/createChatRoom',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/chatrooms/create`, { name: payload }, { withCredentials: true });
      return response.data.chatroom;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'チャットルームの作成に失敗しました');
    }
  }
);

// チャットルーム一覧取得の非同期アクション
export const getChatRooms = createAsyncThunk(
  'chatrooms/getChatRooms',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/chatrooms`, { withCredentials: true });
      return response.data.chatrooms;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'チャットルームのデータが取得できませんでした');
    }
  }
);

// チャットルームに参加する非同期アクション
export const joinChatRoom = createAsyncThunk(
  'chatrooms/joinChatRoom',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/chatrooms/join/${payload}`, {}, { withCredentials: true });
      return response.data.chatRoom;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'チャットルームの参加に失敗しました');
    }
  }
);

// チャットルームを退出する非同期アクション
export const leaveChatRoom = createAsyncThunk(
  'chatrooms/leaveChatRoom',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`${process.env.REACT_APP_API_URL}/chatrooms/leave/${payload}`, { withCredentials: true });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'チャットルームの退出に失敗しました');
    }
  }
);

const chatroomsSlice = createSlice({
  name: 'chatrooms',
  initialState: {
    chatrooms: [],
    loading: false,
    error: null,
  },
  reducers: {},
  // 非同期アクションの状態管理
  extraReducers: (builder) => {
    builder
      // chatroomの作成が成功した時の状態
      .addCase(createChatRoom.fulfilled, (state, action) => {
        state.chatrooms.push(action.payload);
        state.loading = false;
        state.error = null;
      })
      // ローディング中の状態
      .addCase(createChatRoom.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      // chatroomの作成が失敗した時の状態
      .addCase(createChatRoom.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      // chatroomsの取得が成功した時の状態
      .addCase(getChatRooms.fulfilled, (state, action) => {
        state.chatrooms = action.payload || [];
        state.loading = false;
        state.error = null;
      })
      // chatroomsの取得がローディング中の状態
      .addCase(getChatRooms.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      // chatroomsの取得が失敗した時の状態
      .addCase(getChatRooms.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // chatroomへのjoinが成功した時の状態
      .addCase(joinChatRoom.fulfilled, (state, action) => {
        state.chatrooms = state.chatrooms.map((room) => room.id === action.payload.id ? action.payload : room);
        state.loading = false;
        state.error = null;
      })
      // chatroomへのjoinがローディング中の状態
      .addCase(joinChatRoom.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      // chatroomへのjoinが失敗した時の状態
      .addCase(joinChatRoom.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // chatroomからleaveが成功した時の状態
      .addCase(leaveChatRoom.fulfilled, (state, action) => {
        state.chatrooms = state.chatrooms.filter(room => room.id !== action.payload.roomId);
        state.loading = false;
        state.error = null;
      })
      // chatroomからleaveがローディング中の状態
      .addCase(leaveChatRoom.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      // chatroomからleaveが失敗した時の状態
      .addCase(leaveChatRoom.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
  }
});

export default chatroomsSlice.reducer;