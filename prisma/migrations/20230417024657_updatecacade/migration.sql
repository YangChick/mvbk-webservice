-- DropForeignKey
ALTER TABLE "invoices" DROP CONSTRAINT "invoices_showTimeId_fkey";

-- AddForeignKey
ALTER TABLE "invoices" ADD CONSTRAINT "invoices_showTimeId_fkey" FOREIGN KEY ("showTimeId") REFERENCES "showTime"("id") ON DELETE CASCADE ON UPDATE CASCADE;
