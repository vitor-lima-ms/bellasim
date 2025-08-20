/*
  Warnings:

  - You are about to drop the `Commission` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ContributionMargin` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Freight` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."Diaper" DROP CONSTRAINT "Diaper_commissionPercent_fkey";

-- DropForeignKey
ALTER TABLE "public"."Diaper" DROP CONSTRAINT "Diaper_contributionMarginPercent_fkey";

-- DropForeignKey
ALTER TABLE "public"."Diaper" DROP CONSTRAINT "Diaper_freightPercent_fkey";

-- DropTable
DROP TABLE "public"."Commission";

-- DropTable
DROP TABLE "public"."ContributionMargin";

-- DropTable
DROP TABLE "public"."Freight";
