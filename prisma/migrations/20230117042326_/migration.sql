-- DropForeignKey
ALTER TABLE "seats" DROP CONSTRAINT "seats_typeSeatId_fkey";

-- AddForeignKey
ALTER TABLE "seats" ADD CONSTRAINT "seats_typeSeatId_fkey" FOREIGN KEY ("typeSeatId") REFERENCES "typeSeat"("id") ON DELETE SET NULL ON UPDATE SET NULL;
