/*
  Warnings:

  - You are about to alter the column `category` on the `Events` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(300)`.

*/
-- AlterTable
ALTER TABLE "Events" ALTER COLUMN "category" SET NOT NULL,
ALTER COLUMN "category" SET DATA TYPE VARCHAR(300);
