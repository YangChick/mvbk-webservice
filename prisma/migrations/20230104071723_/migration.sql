/*
  Warnings:

  - You are about to drop the column `showTimeId` on the `ticket` table. All the data in the column will be lost.
  - Added the required column `movieId` to the `showTime` table without a default value. This is not possible if the table is not empty.
  - Added the required column `movieTheaterId` to the `showTime` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ticket" DROP CONSTRAINT "ticket_showTimeId_fkey";

-- AlterTable
ALTER TABLE "showTime" ADD COLUMN     "movieId" TEXT NOT NULL,
ADD COLUMN     "movieTheaterId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "ticket" DROP COLUMN "showTimeId";

-- CreateTable
CREATE TABLE "MovieTheater" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "MovieTheater_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "MovieTheater_id_key" ON "MovieTheater"("id");

-- AddForeignKey
ALTER TABLE "showTime" ADD CONSTRAINT "showTime_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "movies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "showTime" ADD CONSTRAINT "showTime_movieTheaterId_fkey" FOREIGN KEY ("movieTheaterId") REFERENCES "MovieTheater"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
