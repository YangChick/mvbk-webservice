/*
  Warnings:

  - You are about to drop the column `createdAt` on the `userData` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "user" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "userData" DROP COLUMN "createdAt";
