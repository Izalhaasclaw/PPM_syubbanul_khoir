-- AlterTable
ALTER TABLE `artikels` MODIFY `isi` TEXT NOT NULL;

-- AlterTable
ALTER TABLE `informasi` ADD COLUMN `email` VARCHAR(191) NOT NULL DEFAULT 'syukhoir@gmail.com',
    MODIFY `telepon` VARCHAR(191) NOT NULL DEFAULT '083899216097';
