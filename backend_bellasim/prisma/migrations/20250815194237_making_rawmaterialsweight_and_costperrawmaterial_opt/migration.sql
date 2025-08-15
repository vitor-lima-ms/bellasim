/*
  Warnings:

  - Changed the type of `costPerRawMaterial` on the `Diaper` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `rawMaterialsWeight` on the `Diaper` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "public"."Diaper" DROP COLUMN "costPerRawMaterial",
ADD COLUMN     "costPerRawMaterial" JSONB NOT NULL,
DROP COLUMN "rawMaterialsWeight",
ADD COLUMN     "rawMaterialsWeight" JSONB NOT NULL;
