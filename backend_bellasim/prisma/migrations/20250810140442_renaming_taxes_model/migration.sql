/*
  Warnings:

  - You are about to drop the `Taxes` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."Diaper" DROP CONSTRAINT "Diaper_taxesPercent_fkey";

-- DropTable
DROP TABLE "public"."Taxes";

-- CreateTable
CREATE TABLE "public"."Tax" (
    "id" SERIAL NOT NULL,
    "description" TEXT NOT NULL,
    "percent" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Tax_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Tax_percent_key" ON "public"."Tax"("percent");

-- AddForeignKey
ALTER TABLE "public"."Diaper" ADD CONSTRAINT "Diaper_taxesPercent_fkey" FOREIGN KEY ("taxesPercent") REFERENCES "public"."Tax"("percent") ON DELETE RESTRICT ON UPDATE CASCADE;
