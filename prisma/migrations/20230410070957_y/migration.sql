/*
  Warnings:

  - You are about to drop the `food` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `updatedAt` to the `MovieTheater` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "MovieTheater" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- DropTable
DROP TABLE "food";

-- CreateTable
CREATE TABLE "Food" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "price" TEXT NOT NULL,
    "invoiceId" TEXT NOT NULL,

    CONSTRAINT "Food_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Food_id_key" ON "Food"("id");

-- AddForeignKey
ALTER TABLE "Food" ADD CONSTRAINT "Food_invoiceId_fkey" FOREIGN KEY ("invoiceId") REFERENCES "invoices"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
