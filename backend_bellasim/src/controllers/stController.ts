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

export const read = async (req: Request, res: Response) => {
  try {
    const sts = await stService.read();

    res.status(200).json({ sts });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const update = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const description = req.body.description;
  const percent = req.body.percent;

  try {
    const updatedSt = await stService.update(id, description, percent);

    res.status(200).json({ updatedSt });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteById = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);

  try {
    await stService.deleteById(id);

    res.status(200).json({ message: "Deletado com sucesso!" });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
