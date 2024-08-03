-- AlterTable
ALTER TABLE `Authentication` MODIFY `attempts` INTEGER NULL,
    MODIFY `lastAttempt` DATETIME(3) NULL,
    MODIFY `recuperationCode` VARCHAR(191) NULL,
    MODIFY `recuperationSolicitedAt` DATETIME(3) NULL;
