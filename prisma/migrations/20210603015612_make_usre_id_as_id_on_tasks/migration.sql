/*
  Warnings:

  - The primary key for the `Task` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "Task" DROP CONSTRAINT "Task_pkey",
ADD PRIMARY KEY ("id", "userId");
