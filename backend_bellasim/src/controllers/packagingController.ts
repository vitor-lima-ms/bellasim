import { Request, Response } from "express";
import { PackagingService } from "../services/packagingService";

export class PackagingController {
  private constructor() {}

  static async create(req: Request, res: Response) {
    const description = req.body.description;
    const cost = req.body.cost;

    try {
      const packaging = await PackagingService.create(description, cost);

      res.status(201).json({ packaging });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  static async read(req: Request, res: Response) {
    try {
      const packagings = await PackagingService.read();

      res.status(200).json({ packagings });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  static async readById(req: Request, res: Response) {
    const id = parseInt(req.params.id);

    try {
      const packaging = await PackagingService.readById(id);

      res.status(200).json({ packaging });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  static async update(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    const description = req.body.description;
    const cost = req.body.cost;

    try {
      const updatedPackaging = await PackagingService.update(
        id,
        description,
        cost
      );

      res.status(200).json({ updatedPackaging });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  static async deleteById(req: Request, res: Response) {
    const id = parseInt(req.params.id);

    try {
      await PackagingService.deleteById(id);

      res.status(200).json({ message: "Deletado com sucesso!" });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }
}
