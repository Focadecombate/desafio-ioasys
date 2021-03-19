/*
  Warnings:

  - The migration will add a unique constraint covering the columns `[userid]` on the table `Vote`. If there are existing duplicate values, the migration will fail.
  - Added the required column `name` to the `Actors` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Actors" ADD COLUMN     "name" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Vote_userid_unique" ON "Vote"("userid");
