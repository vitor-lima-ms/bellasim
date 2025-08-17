/*
  Warnings:

  - You are about to drop the column `taxesPercent` on the `Diaper` table. All the data in the column will be lost.
  - Added the required column `taxPercent` to the `Diaper` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."Diaper" DROP CONSTRAINT "Diaper_taxesPercent_fkey";

-- AlterTable
ALTER TABLE "public"."Diaper" DROP COLUMN "taxesPercent",
ADD COLUMN     "taxPercent" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "public"."Diaper" ADD CONSTRAINT "Diaper_taxPercent_fkey" FOREIGN KEY ("taxPercent") REFERENCES "public"."Tax"("percent") ON DELETE RESTRICT ON UPDATE CASCADE;
