import { Request, Response } from "express";
import * as rawMaterialService from "../services/rawMaterialService";

export const create = async (req: Request, res: Response) => {
  const name = req.body.name;
  const unit = req.body.unit;
  const unitCost = req.body.unitCost;

  try {
    const rawMaterial = await rawMaterialService.create(name, unit, unitCost);

    res.status(200).json({ rawMaterial });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const read = async (req: Request, res: Response) => {
  try {
    const rawMaterials = await rawMaterialService.read();

    res.status(200).json({ rawMaterials });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const readById = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);

  try {
    const rawMaterial = await rawMaterialService.readById(id);

    res.status(200).json({ rawMaterial });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const update = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const name = req.body.name;
  const unit = req.body.unit;
  const unitCost = req.body.unitCost;

  try {
    const updatedRawMaterial = await rawMaterialService.update(
      id,
      name,
      unit,
      unitCost
    );

    res.status(200).json({ updatedRawMaterial });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteById = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);

  try {
    await rawMaterialService.deleteById(id);

    res.status(200).json({ message: "Deletado com sucesso!" });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
