import { Request, Response } from "express";
import { TaxService } from "../services/taxService";

export class TaxController {
  private constructor() {}

  static async create(req: Request, res: Response) {
    const description = req.body.description;
    const percent = req.body.percent;

    try {
      const tax = await TaxService.create(description, percent);

      res.status(201).json({ tax });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  static async read(req: Request, res: Response) {
    try {
      const taxes = await TaxService.read();

      res.status(200).json({ taxes });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  static async readById(req: Request, res: Response) {
    const id = parseInt(req.params.id);

    try {
      const tax = await TaxService.readById(id);

      res.status(200).json({ tax });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  static async update(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    const description = req.body.description;
    const percent = req.body.percent;

    try {
      const updatedTax = await TaxService.update(id, description, percent);

      res.status(200).json({ updatedTax });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  static async deleteById(req: Request, res: Response) {
    const id = parseInt(req.params.id);

    try {
      await TaxService.deleteById(id);

      res.status(200).json({ message: "Deletado com sucesso!" });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }
}
