/*
  Warnings:

  - You are about to drop the column `paymentId` on the `invoices` table. All the data in the column will be lost.
  - You are about to drop the column `ticketId` on the `invoices` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `invoices` table. All the data in the column will be lost.
  - You are about to drop the `_FoodToInvoices` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `client` to the `invoices` table without a default value. This is not possible if the table is not empty.
  - Added the required column `movieName` to the `invoices` table without a default value. This is not possible if the table is not empty.
  - Added the required column `paymentNumber` to the `invoices` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phoneNumber` to the `invoices` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_FoodToInvoices" DROP CONSTRAINT "_FoodToInvoices_A_fkey";

-- DropForeignKey
ALTER TABLE "_FoodToInvoices" DROP CONSTRAINT "_FoodToInvoices_B_fkey";

-- DropForeignKey
ALTER TABLE "invoices" DROP CONSTRAINT "invoices_paymentId_fkey";

-- DropForeignKey
ALTER TABLE "invoices" DROP CONSTRAINT "invoices_userId_fkey";

-- DropForeignKey
ALTER TABLE "seats" DROP CONSTRAINT "seats_typeSeatId_fkey";

-- DropForeignKey
ALTER TABLE "ticket" DROP CONSTRAINT "ticket_invoiceId_fkey";

-- AlterTable
ALTER TABLE "invoices" DROP COLUMN "paymentId",
DROP COLUMN "ticketId",
DROP COLUMN "userId",
ADD COLUMN     "client" TEXT NOT NULL,
ADD COLUMN     "listSeats" TEXT[],
ADD COLUMN     "movieName" TEXT NOT NULL,
ADD COLUMN     "paymentNumber" TEXT NOT NULL,
ADD COLUMN     "phoneNumber" TEXT NOT NULL;

-- DropTable
DROP TABLE "_FoodToInvoices";

-- AddForeignKey
ALTER TABLE "seats" ADD CONSTRAINT "seats_typeSeatId_fkey" FOREIGN KEY ("typeSeatId") REFERENCES "typeSeat"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
