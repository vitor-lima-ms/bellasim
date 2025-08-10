/*
  Warnings:

  - Added the required column `diaperModel` to the `RawMaterial` table without a default value. This is not possible if the table is not empty.
  - Added the required column `weigth` to the `RawMaterial` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."RawMaterial" ADD COLUMN     "diaperModel" TEXT NOT NULL,
ADD COLUMN     "weigth" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "public"."Packaging" (
    "id" SERIAL NOT NULL,
    "description" TEXT NOT NULL,
    "cost" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Packaging_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."BaleBag" (
    "id" SERIAL NOT NULL,
    "description" TEXT NOT NULL,
    "cost" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BaleBag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Commission" (
    "id" SERIAL NOT NULL,
    "description" TEXT NOT NULL,
    "percent" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Commission_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Taxes" (
    "id" SERIAL NOT NULL,
    "description" TEXT NOT NULL,
    "percent" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Taxes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Freight" (
    "id" SERIAL NOT NULL,
    "description" TEXT NOT NULL,
    "percent" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Freight_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."ContributionMargin" (
    "id" SERIAL NOT NULL,
    "description" TEXT NOT NULL,
    "percent" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ContributionMargin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."ST" (
    "id" SERIAL NOT NULL,
    "description" TEXT NOT NULL,
    "percent" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ST_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Diaper" (
    "id" SERIAL NOT NULL,
    "model" TEXT NOT NULL,
    "costPerRawMaterial" JSONB[],
    "packageQuantity" TEXT NOT NULL,
    "packagingCost" TEXT NOT NULL,
    "baleBagCost" TEXT NOT NULL,
    "diaperPackageCost" TEXT NOT NULL,
    "diaperUnitCost" TEXT NOT NULL,
    "commissionPercent" TEXT NOT NULL,
    "taxesPercent" TEXT NOT NULL,
    "freightPercent" TEXT NOT NULL,
    "contributionMarginPercent" TEXT NOT NULL,
    "STPercent" TEXT NOT NULL,
    "salePrice" TEXT NOT NULL,
    "unitSalePrice" TEXT NOT NULL,
    "salePriceWithST" TEXT NOT NULL,
    "unitSalePriceWithST" TEXT NOT NULL,
    "finalSalePrice" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Diaper_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."_DiaperToRawMaterial" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_DiaperToRawMaterial_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "Packaging_cost_key" ON "public"."Packaging"("cost");

-- CreateIndex
CREATE UNIQUE INDEX "BaleBag_cost_key" ON "public"."BaleBag"("cost");

-- CreateIndex
CREATE UNIQUE INDEX "Commission_percent_key" ON "public"."Commission"("percent");

-- CreateIndex
CREATE UNIQUE INDEX "Taxes_percent_key" ON "public"."Taxes"("percent");

-- CreateIndex
CREATE UNIQUE INDEX "Freight_percent_key" ON "public"."Freight"("percent");

-- CreateIndex
CREATE UNIQUE INDEX "ContributionMargin_percent_key" ON "public"."ContributionMargin"("percent");

-- CreateIndex
CREATE UNIQUE INDEX "ST_percent_key" ON "public"."ST"("percent");

-- CreateIndex
CREATE UNIQUE INDEX "Diaper_model_key" ON "public"."Diaper"("model");

-- CreateIndex
CREATE INDEX "_DiaperToRawMaterial_B_index" ON "public"."_DiaperToRawMaterial"("B");

-- AddForeignKey
ALTER TABLE "public"."Diaper" ADD CONSTRAINT "Diaper_packagingCost_fkey" FOREIGN KEY ("packagingCost") REFERENCES "public"."Packaging"("cost") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Diaper" ADD CONSTRAINT "Diaper_baleBagCost_fkey" FOREIGN KEY ("baleBagCost") REFERENCES "public"."BaleBag"("cost") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Diaper" ADD CONSTRAINT "Diaper_commissionPercent_fkey" FOREIGN KEY ("commissionPercent") REFERENCES "public"."Commission"("percent") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Diaper" ADD CONSTRAINT "Diaper_taxesPercent_fkey" FOREIGN KEY ("taxesPercent") REFERENCES "public"."Taxes"("percent") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Diaper" ADD CONSTRAINT "Diaper_freightPercent_fkey" FOREIGN KEY ("freightPercent") REFERENCES "public"."Freight"("percent") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Diaper" ADD CONSTRAINT "Diaper_contributionMarginPercent_fkey" FOREIGN KEY ("contributionMarginPercent") REFERENCES "public"."ContributionMargin"("percent") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Diaper" ADD CONSTRAINT "Diaper_STPercent_fkey" FOREIGN KEY ("STPercent") REFERENCES "public"."ST"("percent") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_DiaperToRawMaterial" ADD CONSTRAINT "_DiaperToRawMaterial_A_fkey" FOREIGN KEY ("A") REFERENCES "public"."Diaper"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_DiaperToRawMaterial" ADD CONSTRAINT "_DiaperToRawMaterial_B_fkey" FOREIGN KEY ("B") REFERENCES "public"."RawMaterial"("id") ON DELETE CASCADE ON UPDATE CASCADE;
