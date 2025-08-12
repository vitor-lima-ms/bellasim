/*
  Warnings:

  - You are about to drop the column `diaperModel` on the `RawMaterial` table. All the data in the column will be lost.
  - You are about to drop the column `weigth` on the `RawMaterial` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."Diaper" ADD COLUMN     "rawMaterialsWeight" JSONB[];

-- AlterTable
ALTER TABLE "public"."RawMaterial" DROP COLUMN "diaperModel",
DROP COLUMN "weigth";
