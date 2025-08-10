-- CreateTable
CREATE TABLE "public"."Cost" (
    "id" SERIAL NOT NULL,
    "rawMaterial" TEXT NOT NULL,
    "unit" TEXT NOT NULL,
    "unitCost" TEXT NOT NULL,

    CONSTRAINT "Cost_pkey" PRIMARY KEY ("id")
);
