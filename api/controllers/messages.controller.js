const prisma = require('../util/prisma');
const { validationResult } = require('express-validator');
const HttpError = require('../util/http-error');

// * POST => /api/messages/:roomId/create
exports.createMessage = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array()
    });
  };

  const { content } = req.body;
  const roomId = parseInt(req.params.roomId);
  try {
    const isMember = await prisma.userRooms.findUnique({
      where: {
        userId_chatRoomId: {
          userId: req.user.userId,
          chatRoomId: roomId
        }
      }
    });

    if (!isMember) {
      throw new HttpError('チャットルームに参加していません', 403);
    }
    const message = await prisma.message.create({
      data: {
        content: content,
        userId: req.user.userId,
        chatRoomId: roomId,
      }
    });
    res.status(201).json({
      success: true,
      message: message
    });
  } catch (error) {
    next(error);
  }
};

// * GET => /api/messages/:roomId
exports.getMessages = async (req, res, next) => {
  const roomId = parseInt(req.params.roomId);
  try {
    const isMember = await prisma.userRooms.findUnique({
      where: {
        userId_chatRoomId: {
          userId: req.user.userId,
          chatRoomId: roomId
        }
      }
    });

    if (!isMember) {
      throw new HttpError('チャットルームに参加していません', 403);
    };

    const messages = await prisma.message.findMany({
      where: {
        chatRoomId: roomId
      },
      include: {
        user: {
          select: { id: true, name: true }
        }
      },
      orderBy: {
        createdAt: 'asc'
      }
    });

    res.status(200).json({
      success: true,
      messages: messages
    });
  } catch (error) {
    next(error);
  }
};

// * PATCH => /api/messages/:messageId
exports.updateMessage = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array()
    });
  };

  const messageId = parseInt(req.params.messageId);
  const { content } = req.body;

  try {
    const message = await prisma.message.findUnique({
      where: { id: messageId },
    });
    if (!message) {
      throw new HttpError('指定されたidのメッセージが存在しません', 404);
    }
    if (message.userId !== parseInt(req.user.userId)) {
      throw new HttpError('他の人のメッセージは編集できません', 401);
    }

    const updatedMessage = await prisma.message.update({
      where: { id: messageId },
      data: {
        content: content
      }
    });

    res.status(200).json({
      success: true,
      message: updatedMessage
    });
  } catch (error) {
    next(error);
  }
};

// * DELETE => /api/messages/:messageId
exports.deleteMessage = async (req, res, next) => {
  const messageId = parseInt(req.params.messageId);
  try {
    const message = await prisma.message.findUnique({
      where: { id: messageId }
    });
    if (!message) {
      throw new HttpError('指定されたメッセージが存在しません', 404);
    }

    if (message.userId !== req.user.userId) {
      throw new HttpError('他のユーザーのメッセージは削除できません', 403);
    };

    await prisma.message.delete({
      where: { id: messageId }
    });

    res.status(200).json({
      success: true,
      message: 'メッセージを削除しました'
    });
  } catch (error) {
    next(error);
  }
};