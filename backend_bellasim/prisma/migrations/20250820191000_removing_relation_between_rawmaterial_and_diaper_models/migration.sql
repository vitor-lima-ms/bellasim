/*
  Warnings:

  - You are about to drop the `_DiaperToRawMaterial` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."_DiaperToRawMaterial" DROP CONSTRAINT "_DiaperToRawMaterial_A_fkey";

-- DropForeignKey
ALTER TABLE "public"."_DiaperToRawMaterial" DROP CONSTRAINT "_DiaperToRawMaterial_B_fkey";

-- DropTable
DROP TABLE "public"."_DiaperToRawMaterial";
