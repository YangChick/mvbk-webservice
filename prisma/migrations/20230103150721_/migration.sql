/*
  Warnings:

  - You are about to drop the column `roleCode` on the `userData` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "user" ADD COLUMN     "roleCode" "Role" NOT NULL DEFAULT 'USER';

-- AlterTable
ALTER TABLE "userData" DROP COLUMN "roleCode";
