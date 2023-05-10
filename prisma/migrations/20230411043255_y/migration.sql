/*
  Warnings:

  - You are about to drop the column `movieTheater` on the `invoices` table. All the data in the column will be lost.
  - Added the required column `movieTheaterId` to the `invoices` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "invoices" DROP COLUMN "movieTheater",
ADD COLUMN     "movieTheaterId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "invoices" ADD CONSTRAINT "invoices_movieTheaterId_fkey" FOREIGN KEY ("movieTheaterId") REFERENCES "MovieTheater"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
