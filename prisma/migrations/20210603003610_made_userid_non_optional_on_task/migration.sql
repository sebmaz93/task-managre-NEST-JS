/*
  Warnings:

  - Made the column `userId` on table `Task` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX "User.salt_unique";

-- AlterTable
ALTER TABLE "Task" ALTER COLUMN "userId" SET NOT NULL;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "salt" DROP NOT NULL;
