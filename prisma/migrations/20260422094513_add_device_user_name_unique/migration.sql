/*
  Warnings:

  - A unique constraint covering the columns `[userId,name]` on the table `Device` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Device_userId_name_key" ON "Device"("userId", "name");
