import { Request, Response } from "express";
import { FreightService } from "../services/freightService";

export class FreightController {
  private constructor() {}

  static async create(req: Request, res: Response) {
    const description = req.body.description;
    const percent = req.body.percent;

    try {
      const freight = await FreightService.create(description, percent);

      res.status(201).json({ freight });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  static async read(req: Request, res: Response) {
    try {
      const freights = await FreightService.read();

      res.status(200).json({ freights });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  static async readById(req: Request, res: Response) {
    const id = parseInt(req.params.id);

    try {
      const freight = await FreightService.readById(id);

      res.status(200).json({ freight });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  static async update(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    const description = req.body.description;
    const percent = req.body.percent;

    try {
      const updatedFreight = await FreightService.update(
        id,
        description,
        percent
      );

      res.status(200).json({ updatedFreight });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  static async deleteById(req: Request, res: Response) {
    const id = parseInt(req.params.id);

    try {
      await FreightService.deleteById(id);

      res.status(200).json({ message: "Deletado com sucesso!" });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }
}
