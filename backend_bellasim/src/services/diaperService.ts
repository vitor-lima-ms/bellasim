import { IDiaper } from "../types/diaper";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class DiaperService {
  private constructor() {}

  static async createOrUpdate(diaper: IDiaper) {
    const updatedOrCreatedDiaper = await prisma.diaper.upsert({
      create: {
        model: diaper.model,
        rawMaterials: diaper.rawMaterials,
        rawMaterialsWeight: diaper.rawMaterialsWeight,
        costPerRawMaterial: diaper.costPerRawMaterial,
        packageQuantity: diaper.packageQuantity,
        packagingCost: diaper.packagingCost,
        baleBagCost: diaper.baleBagCost,
        commissionPercent: diaper.commissionPercent,
        taxesPercent: diaper.taxesPercent,
        freightPercent: diaper.freightPercent,
        contributionMarginPercent: diaper.contributionMarginPercent,
        STPercent: diaper.STPercent,
      },
      update: {
        rawMaterials: diaper.rawMaterials,
        rawMaterialsWeight: diaper.rawMaterialsWeight,
        costPerRawMaterial: diaper.costPerRawMaterial,
        unitCost: diaper.unitCost,
        packageQuantity: diaper.packageQuantity,
        packagingCost: diaper.packagingCost,
        baleBagCost: diaper.baleBagCost,
        diaperPackageCost: diaper.diaperPackageCost,
        diaperUnitCost: diaper.diaperUnitCost,
        commissionPercent: diaper.commissionPercent,
        taxesPercent: diaper.taxesPercent,
        freightPercent: diaper.freightPercent,
        contributionMarginPercent: diaper.contributionMarginPercent,
        STPercent: diaper.STPercent,
        salePrice: diaper.salePrice,
        unitSalePrice: diaper.unitSalePrice,
        salePriceWithST: diaper.salePriceWithST,
        unitSalePriceWithST: diaper.unitSalePriceWithST,
        finalSalePrice: diaper.finalSalePrice,
      },
      where: {
        model: diaper.model,
      },
    });

    return updatedOrCreatedDiaper;
  }
}
