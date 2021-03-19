/*
  Warnings:

  - You are about to drop the column `userid` on the `Vote` table. All the data in the column will be lost.
  - The migration will add a unique constraint covering the columns `[userId]` on the table `Vote`. If there are existing duplicate values, the migration will fail.
  - Added the required column `userId` to the `Vote` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Vote" DROP CONSTRAINT "Vote_userid_fkey";

-- DropIndex
DROP INDEX "Vote_userid_unique";

-- AlterTable
ALTER TABLE "Vote" DROP COLUMN "userid",
ADD COLUMN     "userId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Vote_userId_unique" ON "Vote"("userId");

-- AddForeignKey
ALTER TABLE "Vote" ADD FOREIGN KEY ("userId") REFERENCES "Movie"("id") ON DELETE CASCADE ON UPDATE CASCADE;
