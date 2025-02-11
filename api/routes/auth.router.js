const router = require('express').Router();
const { check } = require('express-validator');
const authMiddleware = require('../middleware/auth.middleware');
const { signup, verifyEmail, signin, signout, checkAuth, forgotPassword, resetPassword } = require('../controllers/auth.controller');

// * POST => /api/auth/signup
router.post('/signup',
  [
    check("name").notEmpty().withMessage("名前が未入力です"),
    check("email").isEmail().withMessage("正しいメールアドレスを入力してください"),
    check("password").isLength({ min: 6 }).withMessage("パスワードは６文字以上で入力してください")
  ],
  signup);

// * POST => /api/auth/verify-email
router.post('/verify-email', verifyEmail);

// * POST => /api/auth/signin
router.post('/signin',
  [
    check("email").isEmail().withMessage("正しいメールアドレスを入力してください"),
    check("password").isLength({ min: 6 }).withMessage("パスワードは６文字以上で入力してください")
  ],
  signin);

// * POST => /api/auth/signout
router.post('/signout', signout);

// * GET => /api/auth/check-auth
router.get('/check-auth', authMiddleware, checkAuth);

// * POST => /api/auth/forgot-password
router.post('/forgot-password',
  [
    check('email').isEmail().withMessage("正しいメールアドレスを入力してください")
  ],
  forgotPassword);

// * POST => /api/auth/reset-password
router.post('reset-password',
  [
    check("newPassword").isLength({ min: 6 }).withMessage("パスワードは６文字以上で入力してください")
  ],
  resetPassword
);

module.exports = router;