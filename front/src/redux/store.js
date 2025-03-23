import { configureStore } from '@reduxjs/toolkit';
import chatroomReducer from './chatroomsReducer';
import messagesReducer from './messagesReducer';

export const store = configureStore({
  reducer: {
    chatrooms: chatroomReducer,
    messages: messagesReducer
  }
});