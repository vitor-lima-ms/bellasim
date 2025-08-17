import { IDiaperFromFrontend } from "../types/diaperFromFrontend";
import { Request, Response } from "express";
import { DiaperService } from "../services/diaperService";

export class DiaperController {
  private constructor() {}

  static async createOrUpdate(req: Request, res: Response) {
    const diaperFromFrontend: IDiaperFromFrontend = {
      model: req.body.model,
      packageQuantity: req.body.packageQuantity,
      packagingCost: req.body.packagingCost,
      baleBagCost: req.body.baleBagCost,
      commissionPercent: req.body.commissionPercent,
      taxPercent: req.body.taxPercent,
      freightPercent: req.body.freightPercent,
      contributionMarginPercent: req.body.contributionMarginPercent,
      STPercent: req.body.stPercent,
      rawMaterialsWeightsJSON: req.body.rawMaterialsWeightsJSON,
    };

    try {
      const updatedOrCreatedDiaper =
        DiaperService.createOrUpdate(diaperFromFrontend);

      res.status(200).json({ updatedOrCreatedDiaper });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }
}
