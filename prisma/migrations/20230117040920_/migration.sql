/*
  Warnings:

  - You are about to drop the `movies` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "showTime" DROP CONSTRAINT "showTime_movieId_fkey";

-- DropForeignKey
ALTER TABLE "ticket" DROP CONSTRAINT "ticket_movieId_fkey";

-- DropTable
DROP TABLE "movies";
