-- DropForeignKey
ALTER TABLE "showTime" DROP CONSTRAINT "showTime_movieId_fkey";

-- AlterTable
ALTER TABLE "showTime" ADD COLUMN     "moviesId" TEXT;

-- AddForeignKey
ALTER TABLE "showTime" ADD CONSTRAINT "showTime_moviesId_fkey" FOREIGN KEY ("moviesId") REFERENCES "movies"("id") ON DELETE SET NULL ON UPDATE CASCADE;
