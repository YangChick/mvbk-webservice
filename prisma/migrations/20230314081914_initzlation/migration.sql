/*
  Warnings:

  - Added the required column `showTime` to the `invoices` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "invoices" ADD COLUMN     "showTime" TEXT NOT NULL;
