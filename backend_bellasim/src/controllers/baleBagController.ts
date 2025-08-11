import { Request, Response } from "express";
import * as baleBagService from "../services/baleBagService";

export const create = async (req: Request, res: Response) => {
  const description = req.body.description;
  const cost = req.body.cost;

  try {
    const baleBag = await baleBagService.create(description, cost);

    res.status(201).json({ baleBag });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const read = async (req: Request, res: Response) => {
  try {
    const baleBags = await baleBagService.read();

    res.status(200).json({ baleBags });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
