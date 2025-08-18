/*
  Warnings:

  - A unique constraint covering the columns `[modelSize]` on the table `Diaper` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `modelSize` to the `Diaper` table without a default value. This is not possible if the table is not empty.
  - Added the required column `size` to the `Diaper` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Diaper" ADD COLUMN     "modelSize" TEXT NOT NULL,
ADD COLUMN     "size" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Diaper_modelSize_key" ON "public"."Diaper"("modelSize");
