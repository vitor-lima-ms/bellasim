import { IRawMaterial } from "./rawMaterial";
import { IRawMaterialWeight } from "./rawMaterialWeight";
import { ICostPerRawMaterial } from "./costPerRawMaterial";

export interface IDiaper {
  model: string;
  rawMaterials: string[];
  rawMaterialsWeight: IRawMaterialWeight;
  costPerRawMaterial: ICostPerRawMaterial;
  unitCost: string;
  packageQuantity: string;
  packagingCost: string;
  baleBagCost: string;
  diaperPackageCost: string;
  diaperUnitCost: string;
  commissionPercent: string;
  taxesPercent: string;
  freightPercent: string;
  contributionMarginPercent: string;
  STPercent: string;
  salePrice: string;
  unitSalePrice: string;
  salePriceWithST: string;
  unitSalePriceWithST: string;
  finalSalePrice: string;
}
