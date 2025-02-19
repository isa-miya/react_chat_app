const prisma = require('../util/prisma');
const HttpError = require('../util/http-error');
const { validationResult } = require('express-validator');

// * POST => /api/chatrooms/create
exports.createChatRooms = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      error: errors.array()
    });
  }
  const { name } = req.body;
  const userId = req.user?.userId;

  try {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      throw new HttpError('ユーザーが見つかりません', 404);
    }

    const chatroom = await prisma.chatRoom.create({
      data: {
        name: name,
      }
    });

    await prisma.userRooms.create({
      data: {
        userId: userId,
        chatRoomId: chatroom.id
      }
    });

    res.status(201).json({
      success: true,
      chatroom
    });
  } catch (error) {
    next(error);
  }
};

// * GET => /api/chatrooms
exports.getChatRooms = async (req, res, next) => {
  try {
    const chatrooms = await prisma.chatRoom.findMany({
      include: {
        users: {
          include: {
            user: true
          }
        }
      }
    });
    if (chatrooms.length === 0) {
      return res.status(204).json({
        success: true,
        message: 'まだチャットルームはありません',
        chatrooms: []
      });
    };
    res.status(200).json({
      success: true,
      chatrooms
    });
  } catch (error) {
    next(error);
  }
};

// * POST => /api/chatrooms/join/:id
exports.joinChatRoom = async (req, res, next) => {
  const roomId = parseInt(req.params.id);
  try {
    // チャットルームを検索
    const chatRoom = await prisma.chatRoom.findUnique({
      where: {
        id: roomId,
      }
    });
    if (!chatRoom) {
      throw new HttpError('チャットルームが見つかりません', 404);
    };
    // チャットに参加済みかどうか確認
    const existingEntry = await prisma.userRooms.findUnique({
      where: {
        userId_chatRoomId: {
          userId: req.user.userId,
          chatRoomId: roomId
        }
      }
    });
    if (existingEntry) {
      return res.status(400).json({
        success: false,
        message: 'すでにこのチャットルームに参加しています'
      });
    };
    // UserRoomsにデータを追加
    await prisma.userRooms.create({
      data: {
        userId: req.user.userId,
        chatRoomId: roomId
      }
    });
    // 更新されたチャットルーム情報を取得
    const updatedChatRoom = await prisma.chatRoom.findUnique({
      where: { id: roomId },
      include: {
        users: {
          include: {
            user: true
          }
        }
      }
    });
    res.status(200).json({
      success: true,
      message: 'チャットルームに参加しました',
      chatRoom: updatedChatRoom
    });
  } catch (error) {
    next(error);
  }
};

// * POST => /api/chatrooms/leave/:id
exports.leaveChatRoom = async (req, res, next) => {
  const roomId = parseInt(req.params.id);
  try {
    await prisma.userRooms.delete({
      where: {
        userId_chatRoomId: {
          userId: req.user.userId,
          chatRoomId: roomId
        }
      }
    });
    res.status(200).json({
      success: true,
      message: 'チャットルームを退出しました'
    });
  } catch (error) {
    next(error);
  }
};