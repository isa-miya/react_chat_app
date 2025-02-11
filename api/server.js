const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();

// routerのインポート
const AUthRouter = require('./routes/auth.router');

// アプリの設定
app.use(express.json(), express.urlencoded({ extended: true }), cookieParser());

// ルーターのマウント
app.use('/api/auth', AUthRouter);

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