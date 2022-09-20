/*
  Warnings:

  - You are about to drop the column `city` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `User` DROP COLUMN `city`,
    ADD COLUMN `nickname` VARCHAR(191) NULL;
