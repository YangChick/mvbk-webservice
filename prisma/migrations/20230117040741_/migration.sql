/*
  Warnings:

  - You are about to drop the column `moviesId` on the `showTime` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "showTime" DROP CONSTRAINT "showTime_moviesId_fkey";

-- AlterTable
ALTER TABLE "showTime" DROP COLUMN "moviesId";

-- AddForeignKey
ALTER TABLE "showTime" ADD CONSTRAINT "showTime_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "movies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
