/*
  Warnings:

  - Added the required column `imageKey` to the `Food` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Food" ADD COLUMN     "imageKey" TEXT NOT NULL;
