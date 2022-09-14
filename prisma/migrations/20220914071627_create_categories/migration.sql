-- CreateTable
CREATE TABLE `categories` (
    `num` INTEGER NOT NULL AUTO_INCREMENT,
    `id` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`num`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
