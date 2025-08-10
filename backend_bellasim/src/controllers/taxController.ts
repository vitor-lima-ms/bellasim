import { Request, Response } from "express";
import * as taxService from "../services/taxService";

export const create = async (req: Request, res: Response) => {
  const description = req.body.description;
  const percent = req.body.percent;

  try {
    const tax = await taxService.create(description, percent);

    res.status(201).json({ commission: tax });
  } catch (error: any) {
    res.status(500).json({message: error.message})
  }
};
