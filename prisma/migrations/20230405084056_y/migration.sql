/*
  Warnings:

  - Added the required column `movieName` to the `showTime` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "showTime" ADD COLUMN     "movieName" TEXT NOT NULL;
