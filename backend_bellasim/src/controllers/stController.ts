import { Request, Response } from "express";
import { StService } from "../services/stService";

export class StController {
  private constructor() {}

  static async create(req: Request, res: Response) {
    const description = req.body.description;
    const percent = req.body.percent;

    try {
      const st = await StService.create(description, percent);

      res.status(201).json({ st });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  static async read(req: Request, res: Response) {
    try {
      const sts = await StService.read();

      res.status(200).json({ sts });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  static async readById(req: Request, res: Response) {
    const id = parseInt(req.params.id);

    try {
      const st = await StService.readById(id);

      res.status(200).json({ st });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  static async update(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    const description = req.body.description;
    const percent = req.body.percent;

    try {
      const updatedSt = await StService.update(id, description, percent);

      res.status(200).json({ updatedSt });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  static async deleteById(req: Request, res: Response) {
    const id = parseInt(req.params.id);

    try {
      await StService.deleteById(id);

      res.status(200).json({ message: "Deletado com sucesso!" });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }
}
