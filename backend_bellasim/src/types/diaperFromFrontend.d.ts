import { IRawMaterialWeight } from "./rawMaterialWeight";

export interface IDiaperFromFrontend {
  model: string;
  size: string;
  packageQuantity: string;
  packagingCost: string;
  baleBagCost: string;
  commissionPercent: string;
  taxPercent: string;
  freightPercent: string;
  contributionMarginPercent: string;
  STPercent: string;
  rawMaterialsWeightsObject: IRawMaterialWeight;
}
