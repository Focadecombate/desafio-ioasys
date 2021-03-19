/*
  Warnings:

  - You are about to alter the column `grade` on the `Vote` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.

*/
-- AlterTable
ALTER TABLE "Vote" ALTER COLUMN "grade" SET DATA TYPE INTEGER;
