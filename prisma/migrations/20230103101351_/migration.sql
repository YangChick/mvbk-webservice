/*
  Warnings:

  - A unique constraint covering the columns `[id]` on the table `user` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `userData` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "userData" ALTER COLUMN "birth" SET DATA TYPE TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "user_id_key" ON "user"("id");

-- CreateIndex
CREATE UNIQUE INDEX "userData_id_key" ON "userData"("id");
