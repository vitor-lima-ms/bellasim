import { Request, Response } from "express";
import { RawMaterialService } from "../services/rawMaterialService";

export class RawMaterialController {
  private constructor() {}

  static async create(req: Request, res: Response) {
    const name = req.body.name;
    const unit = req.body.unit;
    const unitCost = req.body.unitCost;

    try {
      const rawMaterial = await RawMaterialService.create(name, unit, unitCost);

      res.status(200).json({ rawMaterial });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  static async read(req: Request, res: Response) {
    try {
      const rawMaterials = await RawMaterialService.read();

      res.status(200).json({ rawMaterials });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  static async readById(req: Request, res: Response) {
    const id = parseInt(req.params.id);

    try {
      const rawMaterial = await RawMaterialService.readById(id);

      res.status(200).json({ rawMaterial });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  static async update(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    const name = req.body.name;
    const unit = req.body.unit;
    const unitCost = req.body.unitCost;

    try {
      const updatedRawMaterial = await RawMaterialService.update(
        id,
        name,
        unit,
        unitCost
      );

      res.status(200).json({ updatedRawMaterial });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  static async deleteById(req: Request, res: Response) {
    const id = parseInt(req.params.id);

    try {
      await RawMaterialService.deleteById(id);

      res.status(200).json({ message: "Deletado com sucesso!" });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }
}
