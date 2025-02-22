const router = require('express').Router();
const { check } = require('express-validator');

const authMiddleware = require('../middleware/auth.middleware');
const { createMessage, getMessages, updateMessage, deleteMessage } = require('../controllers/messages.controller');

// * POST => /api/messages/:roomId/create
router.post('/:roomId/create', authMiddleware,
  [
    check("content").notEmpty().withMessage('メッセージが入力されていません')
  ],
  createMessage);

// * GET => /api/messages/:roomId
router.get('/:roomId', authMiddleware, getMessages);

// * PATCH => /api/messages/:messageId
router.patch('/:messageId', authMiddleware,
  [
    check("content").notEmpty().withMessage('メッセージが入力されていません')
  ],
  updateMessage);

// * DELETE => /api/messages/:messageId
router.delete('/:messageId', authMiddleware, deleteMessage);

module.exports = router;