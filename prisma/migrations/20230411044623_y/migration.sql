/*
  Warnings:

  - You are about to drop the `_FoodToInvoices` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_FoodToInvoices" DROP CONSTRAINT "_FoodToInvoices_A_fkey";

-- DropForeignKey
ALTER TABLE "_FoodToInvoices" DROP CONSTRAINT "_FoodToInvoices_B_fkey";

-- AlterTable
ALTER TABLE "Food" ADD COLUMN     "invoice" TEXT[];

-- AlterTable
ALTER TABLE "invoices" ADD COLUMN     "foods" TEXT[];

-- DropTable
DROP TABLE "_FoodToInvoices";
