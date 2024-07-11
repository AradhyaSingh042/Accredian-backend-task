-- CreateTable
CREATE TABLE `Referrer` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(191) NOT NULL,
    `referral_code` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Referrer_email_key`(`email`),
    UNIQUE INDEX `Referrer_referral_code_key`(`referral_code`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Referee` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(191) NOT NULL,
    `referral_code` VARCHAR(191) NOT NULL,
    `referrerId` INTEGER NOT NULL,

    UNIQUE INDEX `Referee_email_key`(`email`),
    UNIQUE INDEX `Referee_referral_code_key`(`referral_code`),
    UNIQUE INDEX `Referee_referrerId_key`(`referrerId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Referee` ADD CONSTRAINT `Referee_referrerId_fkey` FOREIGN KEY (`referrerId`) REFERENCES `Referrer`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
