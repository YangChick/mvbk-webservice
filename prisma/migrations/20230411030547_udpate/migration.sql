-- DropForeignKey
ALTER TABLE "Food" DROP CONSTRAINT "Food_invoiceId_fkey";

-- AlterTable
ALTER TABLE "Food" ALTER COLUMN "invoiceId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Food" ADD CONSTRAINT "Food_invoiceId_fkey" FOREIGN KEY ("invoiceId") REFERENCES "invoices"("id") ON DELETE SET NULL ON UPDATE CASCADE;
