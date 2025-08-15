-- AlterTable
ALTER TABLE "public"."Diaper" ADD COLUMN     "unitCost" TEXT,
ALTER COLUMN "diaperPackageCost" DROP NOT NULL,
ALTER COLUMN "diaperUnitCost" DROP NOT NULL;
