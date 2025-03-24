const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const path = require('path');
// # httpをインポート
const http = require('http');
// # socket.ioをインポート
const { Server } = require('socket.io');

const app = express();
// # Httpサーバーを作成
const server = http.createServer(app);

// # socket.ioの初期化
const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL,
    credentials: true
  }
});

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

// # socket.ioイベントの設定
io.on('connection', (socket) => {
  console.log('ユーザーが接続しました');

  socket.on('joinRoom', (roomId) => {
    socket.join(roomId);
    console.log('ルームに参加:', roomId);
  });

  socket.on('newMessage', (roomId) => {
    socket.to(roomId).emit('newMessage');
  })

  socket.on('disconnect', () => {
    console.log('ユーザーが切断しました');
  });
});

server.listen(8080, () => {
  console.log('Server is running!');
});