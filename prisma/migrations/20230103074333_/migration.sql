/*
  Warnings:

  - The `roleCode` column on the `userData` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `confirmPassword` to the `user` table without a default value. This is not possible if the table is not empty.
  - Made the column `username` on table `user` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN');

-- DropIndex
DROP INDEX "userData_roleCode_key";

-- AlterTable
ALTER TABLE "user" ADD COLUMN     "confirmPassword" TEXT NOT NULL,
ALTER COLUMN "username" SET NOT NULL;

-- AlterTable
ALTER TABLE "userData" DROP COLUMN "roleCode",
ADD COLUMN     "roleCode" "Role" NOT NULL DEFAULT 'USER';
