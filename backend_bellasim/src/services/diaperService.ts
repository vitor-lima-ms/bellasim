import { IDiaperFromFrontend } from "../types/diaperFromFrontend";
import { ICostPerRawMaterial } from "../types/costPerRawMaterial";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class DiaperService {
  private constructor() {}

  static async createOrUpdate(diaperFromFrontend: IDiaperFromFrontend) {
    // modelSize
    const modelSize = `${diaperFromFrontend.model}_${diaperFromFrontend.size}`;
    // rawMaterialsWeight
    const rawMaterialsWeightMap = new Map(
      Object.entries(diaperFromFrontend.rawMaterialsWeightsJSON)
    );

    rawMaterialsWeightMap.forEach((value, key) => {
      if (!value) {
        rawMaterialsWeightMap.delete(key);
      }
    });

    const rawMaterialsWeight = Object.fromEntries(rawMaterialsWeightMap);
    // rawMaterials
    const rawMaterialsInDiaper = Object.keys(rawMaterialsWeight);
    // costPerRawMaterial
    let costPerRawMaterial: ICostPerRawMaterial = {};

    const rawMaterialsFromDB = await prisma.rawMaterial.findMany();

    rawMaterialsFromDB.forEach((rawMaterialFromDB) => {
      for (const rawMaterialInDiaper of rawMaterialsInDiaper) {
        if (rawMaterialFromDB.name === rawMaterialInDiaper) {
          costPerRawMaterial[rawMaterialInDiaper] = String(
            (
              parseFloat(rawMaterialFromDB.unitCost) *
              parseFloat(
                rawMaterialsWeight[
                  rawMaterialInDiaper as keyof typeof rawMaterialsWeight
                ]
              )
            ).toFixed(4)
          );
        }
      }
    });
    // unitCost
    let unitCost = 0;

    for (const cost of Object.values(costPerRawMaterial)) {
      unitCost += parseFloat(cost);
    }

    unitCost *= 1.04; // Estimativa de perdas
    // diaperPackageCost
    const diaperPackageCost =
      unitCost * parseFloat(diaperFromFrontend.packageQuantity) +
      parseFloat(diaperFromFrontend.packagingCost) +
      parseFloat(diaperFromFrontend.baleBagCost);
    // diaperUnitCost
    const diaperUnitCost =
      diaperPackageCost / parseFloat(diaperFromFrontend.packageQuantity);
    // salePrice
    const salePrice =
      diaperPackageCost /
      (1 -
        parseFloat(diaperFromFrontend.commissionPercent) / 100 -
        parseFloat(diaperFromFrontend.taxPercent) / 100 -
        parseFloat(diaperFromFrontend.freightPercent) / 100 -
        parseFloat(diaperFromFrontend.contributionMarginPercent) / 100);
    // unitSalePrice
    const unitSalePrice = (
      salePrice / parseFloat(diaperFromFrontend.packageQuantity)
    ).toFixed(2);
    // salePriceWithST
    const salePriceWithST =
      salePrice * (1 + parseFloat(diaperFromFrontend.STPercent) / 100);
    // unitSalePriceWithST
    const unitSalePriceWithST = (
      salePriceWithST / parseFloat(diaperFromFrontend.packageQuantity)
    ).toFixed(2);

    const updatedOrCreatedDiaper = await prisma.diaper.upsert({
      create: {
        model: diaperFromFrontend.model,
        size: diaperFromFrontend.size,
        modelSize: modelSize,
        rawMaterials: rawMaterialsInDiaper.sort(),
        rawMaterialsWeight: rawMaterialsWeight,
        costPerRawMaterial: costPerRawMaterial,
        unitCost: String(unitCost.toFixed(4)),
        packageQuantity: diaperFromFrontend.packageQuantity,
        packagingCost: diaperFromFrontend.packagingCost,
        baleBagCost: diaperFromFrontend.baleBagCost,
        diaperPackageCost: String(diaperPackageCost.toFixed(3)),
        diaperUnitCost: String(diaperUnitCost.toFixed(3)),
        commissionPercent: diaperFromFrontend.commissionPercent,
        taxPercent: diaperFromFrontend.taxPercent,
        freightPercent: diaperFromFrontend.freightPercent,
        contributionMarginPercent: diaperFromFrontend.contributionMarginPercent,
        STPercent: diaperFromFrontend.STPercent,
        salePrice: String(salePrice.toFixed(3)),
        unitSalePrice: String(Number(unitSalePrice).toFixed(2)),
        salePriceWithST: String(salePriceWithST.toFixed(3)),
        unitSalePriceWithST: String(Number(unitSalePriceWithST).toFixed(2)),
      },
      update: {
        rawMaterials: rawMaterialsInDiaper.sort(),
        rawMaterialsWeight: rawMaterialsWeight,
        costPerRawMaterial: costPerRawMaterial,
        unitCost: String(unitCost.toFixed(4)),
        packageQuantity: diaperFromFrontend.packageQuantity,
        packagingCost: diaperFromFrontend.packagingCost,
        baleBagCost: diaperFromFrontend.baleBagCost,
        diaperPackageCost: String(diaperPackageCost.toFixed(3)),
        diaperUnitCost: String(diaperUnitCost.toFixed(3)),
        commissionPercent: diaperFromFrontend.commissionPercent,
        taxPercent: diaperFromFrontend.taxPercent,
        freightPercent: diaperFromFrontend.freightPercent,
        contributionMarginPercent: diaperFromFrontend.contributionMarginPercent,
        STPercent: diaperFromFrontend.STPercent,
        salePrice: String(salePrice.toFixed(3)),
        unitSalePrice: String(Number(unitSalePrice).toFixed(2)),
        salePriceWithST: String(salePriceWithST.toFixed(3)),
        unitSalePriceWithST: String(Number(unitSalePriceWithST).toFixed(2)),
      },
      where: {
        modelSize: modelSize,
      },
    });

    return updatedOrCreatedDiaper;
  }

  static async readByModelSize(model: string, size: string) {
    const modelSize = `${model}_${size}`;

    const diaper = await prisma.diaper.findUnique({
      where: { modelSize: modelSize },
    });

    return diaper;
  }
}
