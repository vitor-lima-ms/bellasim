import { IRawMaterialWeight } from "./rawMaterialWeight";
import { ICostPerRawMaterial } from "./costPerRawMaterial";

export interface IDiaperFromFrontend {
  model: string;
  packageQuantity: string;
  packagingCost: string;
  baleBagCost: string;
  commissionPercent: string;
  taxPercent: string;
  freightPercent: string;
  contributionMarginPercent: string;
  STPercent: string;
  rawMaterialsWeightsJSON: object;
}
