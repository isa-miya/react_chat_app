const prisma = require('../util/prisma');
const HttpError = require('../util/http-error');
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const { getSignJwt, verifyEmail } = require('../util/jwt');
const sendEmail = require('../util/mailer');

// * POST => /api/auth/signup
exports.signup = async (req, res, next) => {
  const { name, email, password } = req.body;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array()
    });
  };

  try {
    const registeredUser = await prisma.user.findUnique({ where: { email: email } });
    if (registeredUser) {
      throw new HttpError('既にユーザー登録されています', 409);
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword
      }
    });

    const token = getSignJwt({ userId: newUser.id, email: newUser.email });
    sendEmail(newUser.email, token, 'verify');

    res.status(201).json({
      success: true,
      message: 'Emailを送信しました'
    });
  } catch (error) {
    next(error);
  }
};

// * POST => /api/auth/verify-email
exports.verifyEmail = async (req, res, next) => {
  const { token } = req.body;
  const decoded = verifyEmail(token);
  try {
    await prisma.user.update({ where: { email: decoded.email }, data: { isVerified: true } });
    res.status(200).json({
      success: true,
      message: '認証が完了しました'
    });
  } catch (error) {
    next(error);
  }
};

// * POST => /api/auth/signin
exports.signin = async (req, res, next) => {
  const { email, password } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array()
    });
  };

  try {
    const registeredUser = await prisma.user.findUnique({ where: { email } });
    if (!registeredUser) {
      throw new HttpError('ユーザーが登録されていません', 409);
    };
    if (!registeredUser.isVerified) {
      throw new HttpError('メール認証が完了していません', 409);
    }
    const isMatch = await bcrypt.compare(password, registeredUser.password);
    if (!isMatch) {
      throw new HttpError('認証エラーです', 401);
    }
    const token = getSignJwt({ userId: registeredUser.id, email: registeredUser.email });
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 1000
    });

    res.status(200).json({
      success: true,
      user: {
        id: registeredUser.id,
        name: registeredUser.name,
        email: registeredUser.email
      }
    });
  } catch (error) {
    next(error);
  }
};

// * POST => /api/auth/signout
exports.signout = (req, res) => {
  res.clearCookie('token', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax'
  });
  res.status(200).json({
    success: true,
    message: 'ログアウトしました'
  });
};

// * GET => /api/auth/check-auth
exports.checkAuth = (req, res) => {
  res.status(200).json({
    user: req.user
  });
};

// * POST => /api/auth/forgot-password
exports.forgotPassword = async (req, res, next) => {
  const { email } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array()
    });
  }
  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      throw new HttpError('ユーザーが見つかりません', 404);
    }
    const resetToken = getSignJwt({ userId: user.id, email: user.email });
    await sendEmail(email, resetToken, 'reset');
    res.status(200).json({
      success: true,
      messag: 'パスワードリセットメールを送信しました'
    });
  } catch (error) {
    next(error);
  }
};

// * POST => /api/auth/reset-password
exports.resetPassword = async (req, res, next) => {
  const { token, newPassword } = req.body;
  try {
    const decoded = verifyEmail(token);
    const hashedPassword = bcrypt.hash(newPassword, 10);

    await prisma.user.update({
      where: { email: decoded.email },
      data: { password: hashedPassword }
    });

    res.status(200).json({
      success: true,
      message: 'パスワードをリセットしました'
    });
  } catch (error) {
    next(error);
  }
};