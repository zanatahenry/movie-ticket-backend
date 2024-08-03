/*
  Warnings:

  - You are about to drop the `Authentication` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Authentication` DROP FOREIGN KEY `Authentication_userId_fkey`;

-- DropTable
DROP TABLE `Authentication`;

-- CreateTable
CREATE TABLE `authentications` (
    `userId` VARCHAR(191) NOT NULL,
    `recuperationCode` VARCHAR(191) NULL,
    `recuperationSolicitedAt` DATETIME(3) NULL,
    `password` VARCHAR(191) NOT NULL,
    `attempts` INTEGER NULL,
    `lastAttempt` DATETIME(3) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `authentications_userId_key`(`userId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `authentications` ADD CONSTRAINT `authentications_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
