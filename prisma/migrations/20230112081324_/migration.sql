/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `MovieTheater` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "seats" ADD COLUMN     "showTimeId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "MovieTheater_name_key" ON "MovieTheater"("name");

-- AddForeignKey
ALTER TABLE "seats" ADD CONSTRAINT "seats_showTimeId_fkey" FOREIGN KEY ("showTimeId") REFERENCES "showTime"("id") ON DELETE SET NULL ON UPDATE CASCADE;
