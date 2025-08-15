import { Request, Response } from "express";
import { ContributionMarginService } from "../services/contributionMarginService";

export class ContributionMarginController {
  private constructor() {}

  static async create(req: Request, res: Response) {
    const description = req.body.description;
    const percent = req.body.percent;

    try {
      const contributionMargin = await ContributionMarginService.create(
        description,
        percent
      );

      res.status(201).json({ contributionMargin });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  static async read(req: Request, res: Response) {
    try {
      const contributionMargins = await ContributionMarginService.read();

      res.status(200).json({ contributionMargins });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  static async readById(req: Request, res: Response) {
    const id = parseInt(req.params.id);

    try {
      const contributionMargin = await ContributionMarginService.readById(id);

      res.status(200).json({ contributionMargin });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  static async update(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    const description = req.body.description;
    const percent = req.body.percent;

    try {
      const updatedContributionMargin = await ContributionMarginService.update(
        id,
        description,
        percent
      );

      res.status(200).json({ updatedContributionMargin });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  static async deleteById(req: Request, res: Response) {
    const id = parseInt(req.params.id);

    try {
      await ContributionMarginService.deleteById(id);

      res.status(200).json({ message: "Deletado com sucesso!" });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }
}
