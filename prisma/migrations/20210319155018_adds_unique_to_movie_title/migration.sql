/*
  Warnings:

  - The migration will add a unique constraint covering the columns `[title]` on the table `Movie`. If there are existing duplicate values, the migration will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Movie.title_unique" ON "Movie"("title");
