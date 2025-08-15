import { Request, Response } from "express";
import { BaleBagService } from "../services/baleBagService";

export class BaleBagController {
  private constructor() {}

  static async create(req: Request, res: Response) {
    const description = req.body.description;
    const cost = req.body.cost;

    try {
      const baleBag = await BaleBagService.create(description, cost);

      res.status(201).json({ baleBag });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  static async read(req: Request, res: Response) {
    try {
      const baleBags = await BaleBagService.read();

      res.status(200).json({ baleBags });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  static async readById(req: Request, res: Response) {
    const id = parseInt(req.params.id);

    try {
      const baleBag = await BaleBagService.readById(id);

      res.status(200).json({ baleBag });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  static async update(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    const description = req.body.description;
    const cost = req.body.cost;

    try {
      const updatedBaleBag = await BaleBagService.update(id, description, cost);

      res.status(200).json({ updatedBaleBag });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  static async deleteById(req: Request, res: Response) {
    const id = parseInt(req.params.id);

    try {
      await BaleBagService.deleteById(id);

      res.status(200).json({ message: "Deletado com sucesso!" });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }
}
