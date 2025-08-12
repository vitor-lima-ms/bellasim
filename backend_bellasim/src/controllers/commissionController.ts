import { Request, Response } from "express";
import * as commissionService from "../services/commissionService";

export const create = async (req: Request, res: Response) => {
  const description = req.body.description;
  const percent = req.body.percent;

  try {
    const commission = await commissionService.create(description, percent);

    res.status(201).json({ commission });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const read = async (req: Request, res: Response) => {
  try {
    const commissions = await commissionService.read();

    res.status(200).json({ commissions });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const readById = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);

  try {
    const commission = await commissionService.readById(id);

    res.status(200).json({ commission });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const update = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const description = req.body.description;
  const percent = req.body.percent;

  try {
    const updatedCommission = await commissionService.update(
      id,
      description,
      percent
    );

    res.status(200).json({ updatedCommission });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteById = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);

  try {
    await commissionService.deleteById(id);

    res.status(200).json({ message: "Deletado com sucesso!" });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
