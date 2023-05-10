/*
  Warnings:

  - Added the required column `image` to the `Food` table without a default value. This is not possible if the table is not empty.
  - Made the column `showTimeId` on table `seats` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "seats" DROP CONSTRAINT "seats_showTimeId_fkey";

-- AlterTable
ALTER TABLE "Food" ADD COLUMN     "image" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "seats" ALTER COLUMN "showTimeId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "seats" ADD CONSTRAINT "seats_showTimeId_fkey" FOREIGN KEY ("showTimeId") REFERENCES "showTime"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
