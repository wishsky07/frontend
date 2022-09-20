/*
  Warnings:

  - You are about to drop the `SnsAccount` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SnsSession` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `snsusers` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `SnsAccount` DROP FOREIGN KEY `SnsAccount_userId_fkey`;

-- DropForeignKey
ALTER TABLE `SnsSession` DROP FOREIGN KEY `SnsSession_userId_fkey`;

-- DropTable
DROP TABLE `SnsAccount`;

-- DropTable
DROP TABLE `SnsSession`;

-- DropTable
DROP TABLE `snsusers`;
