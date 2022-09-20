/*
  Warnings:

  - The primary key for the `accounts` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `expires_at` on the `accounts` table. All the data in the column will be lost.
  - You are about to drop the column `id_token` on the `accounts` table. All the data in the column will be lost.
  - You are about to drop the column `provider` on the `accounts` table. All the data in the column will be lost.
  - You are about to drop the column `scope` on the `accounts` table. All the data in the column will be lost.
  - You are about to drop the column `session_state` on the `accounts` table. All the data in the column will be lost.
  - You are about to drop the column `token_type` on the `accounts` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `accounts` table. All the data in the column will be lost.
  - You are about to alter the column `id` on the `accounts` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `user_id` on the `accounts` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - The primary key for the `sessions` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `sessions` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `user_id` on the `sessions` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to drop the `users` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `verificationtokens` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[compound_id]` on the table `accounts` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[access_token]` on the table `sessions` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `compound_id` to the `accounts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `provider_id` to the `accounts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `provider_type` to the `accounts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `access_token` to the `sessions` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `accounts` DROP FOREIGN KEY `accounts_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `sessions` DROP FOREIGN KEY `sessions_user_id_fkey`;

-- DropIndex
DROP INDEX `accounts_provider_provider_account_id_key` ON `accounts`;

-- AlterTable
ALTER TABLE `accounts` DROP PRIMARY KEY,
    DROP COLUMN `expires_at`,
    DROP COLUMN `id_token`,
    DROP COLUMN `provider`,
    DROP COLUMN `scope`,
    DROP COLUMN `session_state`,
    DROP COLUMN `token_type`,
    DROP COLUMN `type`,
    ADD COLUMN `access_token_expires` DATETIME(3) NULL,
    ADD COLUMN `compound_id` VARCHAR(191) NOT NULL,
    ADD COLUMN `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `provider_id` VARCHAR(191) NOT NULL,
    ADD COLUMN `provider_type` VARCHAR(191) NOT NULL,
    ADD COLUMN `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    MODIFY `user_id` INTEGER NOT NULL,
    MODIFY `refresh_token` VARCHAR(191) NULL,
    MODIFY `access_token` VARCHAR(191) NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `sessions` DROP PRIMARY KEY,
    ADD COLUMN `access_token` VARCHAR(191) NOT NULL,
    ADD COLUMN `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    MODIFY `user_id` INTEGER NOT NULL,
    ADD PRIMARY KEY (`id`);

-- DropTable
DROP TABLE `users`;

-- DropTable
DROP TABLE `verificationtokens`;

-- CreateTable
CREATE TABLE `categories` (
    `num` INTEGER NOT NULL AUTO_INCREMENT,
    `id` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`num`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NULL,
    `nickname` VARCHAR(191) NULL,
    `password` VARCHAR(191) NOT NULL,
    `role` ENUM('USER', 'OWNER', 'ADMIN') NOT NULL DEFAULT 'USER',
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `accounts_compound_id_key` ON `accounts`(`compound_id`);

-- CreateIndex
CREATE INDEX `providerAccountId` ON `accounts`(`provider_account_id`);

-- CreateIndex
CREATE INDEX `providerId` ON `accounts`(`provider_id`);

-- CreateIndex
CREATE UNIQUE INDEX `sessions_access_token_key` ON `sessions`(`access_token`);

-- RenameIndex
ALTER TABLE `accounts` RENAME INDEX `accounts_user_id_fkey` TO `userId`;
