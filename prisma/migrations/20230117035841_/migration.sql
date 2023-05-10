-- DropForeignKey
ALTER TABLE "showTime" DROP CONSTRAINT "showTime_movieId_fkey";

-- AddForeignKey
ALTER TABLE "showTime" ADD CONSTRAINT "showTime_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "movies"("id") ON DELETE CASCADE ON UPDATE CASCADE;
