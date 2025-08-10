import { Request, Response } from "express";
import * as contributionMarginService from "../services/contributionMarginService";

export const create = async (req: Request, res: Response) => {
  const description = req.body.description;
  const percent = req.body.percent;

  try {
    const contributionMargin = await contributionMarginService.create(
      description,
      percent
    );

    res.status(201).json({ contributionMargin });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
