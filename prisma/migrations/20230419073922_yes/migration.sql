/*
  Warnings:

  - Made the column `roleCode` on table `user` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "user" ALTER COLUMN "roleCode" SET NOT NULL,
ALTER COLUMN "roleCode" SET DEFAULT 'ADMIN';
