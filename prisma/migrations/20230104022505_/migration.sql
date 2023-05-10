/*
  Warnings:

  - You are about to drop the `userData` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "userData" DROP CONSTRAINT "userData_userId_fkey";

-- AlterTable
ALTER TABLE "user" ADD COLUMN     "birth" TEXT,
ADD COLUMN     "gender" TEXT,
ADD COLUMN     "phoneNumber" TEXT;

-- DropTable
DROP TABLE "userData";
