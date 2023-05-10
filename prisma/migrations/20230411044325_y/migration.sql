/*
  Warnings:

  - You are about to drop the column `invoiceId` on the `Food` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Food" DROP CONSTRAINT "Food_invoiceId_fkey";

-- AlterTable
ALTER TABLE "Food" DROP COLUMN "invoiceId";

-- CreateTable
CREATE TABLE "_FoodToInvoices" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_FoodToInvoices_AB_unique" ON "_FoodToInvoices"("A", "B");

-- CreateIndex
CREATE INDEX "_FoodToInvoices_B_index" ON "_FoodToInvoices"("B");

-- AddForeignKey
ALTER TABLE "_FoodToInvoices" ADD CONSTRAINT "_FoodToInvoices_A_fkey" FOREIGN KEY ("A") REFERENCES "Food"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FoodToInvoices" ADD CONSTRAINT "_FoodToInvoices_B_fkey" FOREIGN KEY ("B") REFERENCES "invoices"("id") ON DELETE CASCADE ON UPDATE CASCADE;
