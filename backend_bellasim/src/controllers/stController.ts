import { Request, Response } from "express";
import * as stService from "../services/stService";

export const create = async (req: Request, res: Response) => {
  const description = req.body.description;
  const percent = req.body.percent;

  try {
    const st = await stService.create(description, percent);

    res.status(201).json({ st });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
