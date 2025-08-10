import { Request, Response } from "express";
import * as freightService from "../services/freightService";

export const create = async (req: Request, res: Response) => {
  const description = req.body.description;
  const percent = req.body.percent;

  try {
    const freight = await freightService.create(description, percent);

    res.status(201).json({ freight });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
