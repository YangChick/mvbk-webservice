-- DropForeignKey
ALTER TABLE "seats" DROP CONSTRAINT "seats_showTimeId_fkey";

-- AddForeignKey
ALTER TABLE "seats" ADD CONSTRAINT "seats_showTimeId_fkey" FOREIGN KEY ("showTimeId") REFERENCES "showTime"("id") ON DELETE CASCADE ON UPDATE CASCADE;
