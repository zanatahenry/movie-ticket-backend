/*
  Warnings:

  - Added the required column `recuperationCode` to the `Authentication` table without a default value. This is not possible if the table is not empty.
  - Added the required column `recuperationSolicitedAt` to the `Authentication` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Authentication` ADD COLUMN `recuperationCode` VARCHAR(191) NOT NULL,
    ADD COLUMN `recuperationSolicitedAt` DATETIME(3) NOT NULL;
