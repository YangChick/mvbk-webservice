-- DropForeignKey
ALTER TABLE "showTime" DROP CONSTRAINT "showTime_movieTheaterId_fkey";

-- AddForeignKey
ALTER TABLE "showTime" ADD CONSTRAINT "showTime_movieTheaterId_fkey" FOREIGN KEY ("movieTheaterId") REFERENCES "MovieTheater"("id") ON DELETE CASCADE ON UPDATE CASCADE;
