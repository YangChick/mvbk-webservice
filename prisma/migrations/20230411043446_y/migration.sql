/*
  Warnings:

  - You are about to drop the column `showTime` on the `invoices` table. All the data in the column will be lost.
  - Added the required column `showTimeId` to the `invoices` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "invoices" DROP COLUMN "showTime",
ADD COLUMN     "showTimeId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "invoices" ADD CONSTRAINT "invoices_showTimeId_fkey" FOREIGN KEY ("showTimeId") REFERENCES "showTime"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
