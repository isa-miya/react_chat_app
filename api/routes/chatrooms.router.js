const router = require('express').Router();
const { check } = require('express-validator');
const authMiddleware = require('../middleware/auth.middleware');
const { createChatRooms, getChatRooms, joinChatRoom, leaveChatRoom } = require('../controllers/chatrooms.controller');

// * GET => /api/chatrooms
router.get('/', authMiddleware, getChatRooms);

// * POST => /api/chatrooms/create
router.post('/create', authMiddleware,
  [
    check("name").notEmpty().withMessage("チャットルーム名を入力してください")
  ],
  createChatRooms);

// * POST => /api/chatrooms/join/:id
router.post('/join/:id', authMiddleware, joinChatRoom);

// * DELETE => /api/chatrooms/leave/:id
router.delete('/leave/:id', authMiddleware, leaveChatRoom);

module.exports = router;