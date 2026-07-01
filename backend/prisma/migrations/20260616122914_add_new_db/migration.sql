/*
  Warnings:

  - You are about to drop the column `tanggal` on the `artikels` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `jadwal` table. All the data in the column will be lost.
  - You are about to drop the column `no` on the `jadwal` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `jadwal` table. All the data in the column will be lost.
  - You are about to drop the column `jabatan` on the `users` table. All the data in the column will be lost.
  - Added the required column `updated_at` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `username` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `artikels` DROP COLUMN `tanggal`,
    ADD COLUMN `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `jadwal` DROP COLUMN `name`,
    DROP COLUMN `no`,
    DROP COLUMN `status`;

-- AlterTable
ALTER TABLE `users` DROP COLUMN `jabatan`,
    ADD COLUMN `updated_at` DATETIME(3) NOT NULL,
    ADD COLUMN `username` VARCHAR(191) NOT NULL;

-- CreateTable
CREATE TABLE `informasi` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `telepon` VARCHAR(191) NOT NULL,
    `alamat` VARCHAR(191) NOT NULL,
    `instagram` VARCHAR(191) NOT NULL,
    `tiktok` VARCHAR(191) NOT NULL,
    `youtube` VARCHAR(191) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
