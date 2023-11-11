/*
  Warnings:

  - You are about to alter the column `date` on the `report` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.

*/
-- AlterTable
ALTER TABLE `admin` MODIFY `refresh_token` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `report` MODIFY `date` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `user` MODIFY `refresh_token` VARCHAR(191) NULL;
