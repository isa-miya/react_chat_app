const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const path = require('path');

const app = express();

// routerのインポート
const AUthRouter = require('./routes/auth.router');
const ChatRoomsRouter = require('./routes/chatrooms.router');
const MessagesRouter = require('./routes/messages.router');

// アプリの設定
app.use(express.json(),
  express.urlencoded({ extended: true }),
  cookieParser(),
  cors({ origin: process.env.CLIENT_URL, credentials: true }));

// 静的ファイルを提供する設定
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));

// ルーターのマウント
app.use('/api/auth', AUthRouter);
app.use('/api/chatrooms', ChatRoomsRouter);
app.use('/api/messages', MessagesRouter);

// エラーをキャッチ
app.use((error, req, res, next) => {
  res.status(error.code || 500).json({
    success: false,
    message: error.message || 'サーバーエラーが発生しました'
  });
});

app.listen(8080, () => {
  console.log('Server is running!');
});