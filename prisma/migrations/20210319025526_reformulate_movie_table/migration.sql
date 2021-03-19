/*
  Warnings:

  - You are about to drop the column `content` on the `Movie` table. All the data in the column will be lost.
  - You are about to drop the column `published` on the `Movie` table. All the data in the column will be lost.
  - You are about to drop the column `authorId` on the `Movie` table. All the data in the column will be lost.
  - Added the required column `diretor` to the `Movie` table without a default value. This is not possible if the table is not empty.
  - Added the required column `genre` to the `Movie` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Movie" DROP COLUMN "content",
DROP COLUMN "published",
DROP COLUMN "authorId",
ADD COLUMN     "diretor" TEXT NOT NULL,
ADD COLUMN     "genre" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Actors" (
    "id" TEXT NOT NULL,
    "movieId" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Vote" (
    "id" TEXT NOT NULL,
    "userid" TEXT NOT NULL,
    "grade" BIGINT NOT NULL,

    PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Actors" ADD FOREIGN KEY ("movieId") REFERENCES "Movie"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vote" ADD FOREIGN KEY ("userid") REFERENCES "Movie"("id") ON DELETE CASCADE ON UPDATE CASCADE;
