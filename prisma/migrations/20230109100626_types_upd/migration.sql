/*
  Warnings:

  - You are about to alter the column `replyUserMention` on the `Comment` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `title` on the `Game` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(450)`.
  - You are about to alter the column `name` on the `Genre` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `name` on the `Platform` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `name` on the `Publisher` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.

*/
-- AlterTable
ALTER TABLE "Comment" ALTER COLUMN "replyUserMention" SET DATA TYPE VARCHAR(255);

-- AlterTable
ALTER TABLE "Game" ALTER COLUMN "title" SET DATA TYPE VARCHAR(450);

-- AlterTable
ALTER TABLE "Genre" ALTER COLUMN "name" SET DATA TYPE VARCHAR(255);

-- AlterTable
ALTER TABLE "Platform" ALTER COLUMN "name" SET DATA TYPE VARCHAR(255);

-- AlterTable
ALTER TABLE "Publisher" ALTER COLUMN "name" SET DATA TYPE VARCHAR(255);

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "hashedPassword" SET DATA TYPE TEXT;
