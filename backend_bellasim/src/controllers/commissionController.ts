import { Request, Response } from "express";
import * as commissionService from "../services/commissionService";

export const create = async (req: Request, res: Response) => {
  const description = req.body.description;
  const percent = req.body.percent;

  try {
    const commission = await commissionService.create(description, percent);

    res.status(201).json({ commission });
  } catch (error: any) {
    res.status(500).json({message: error.message})
  }
};
