import { configureStore } from '@reduxjs/toolkit';
import chatroomReducer from './chatroomsReducer';

export const store = configureStore({
  reducer: {
    chatrooms: chatroomReducer
  }
});