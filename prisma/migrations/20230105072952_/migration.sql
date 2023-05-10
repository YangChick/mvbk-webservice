/*
  Warnings:

  - You are about to drop the column `image_key` on the `movies` table. All the data in the column will be lost.
  - Added the required column `imageKey` to the `movies` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "movies" DROP COLUMN "image_key",
ADD COLUMN     "imageKey" TEXT NOT NULL;
