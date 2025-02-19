/*
  Warnings:

  - A unique constraint covering the columns `[userId,chatRoomId]` on the table `UserRooms` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `UserRooms_userId_chatRoomId_key` ON `UserRooms`(`userId`, `chatRoomId`);
