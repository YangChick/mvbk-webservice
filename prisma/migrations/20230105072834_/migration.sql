/*
  Warnings:

  - Added the required column `image_key` to the `movies` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "movies" ADD COLUMN     "image_key" TEXT NOT NULL;
