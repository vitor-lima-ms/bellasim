import { Request, Response } from "express";
import * as packagingService from "../services/packagingService";

export const create = async (req: Request, res: Response) => {
  const description = req.body.description;
  const cost = req.body.cost;

  try {
    const packaging = await packagingService.create(description, cost);

    res.status(201).json({ packaging });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const read = async (req: Request, res: Response) => {
  try {
    const packagings = await packagingService.read();

    res.status(200).json({ packagings });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const readById = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);

  try {
    const packaging = await packagingService.readById(id);

    res.status(200).json({ packaging });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const update = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const description = req.body.description;
  const cost = req.body.cost;

  try {
    const updatedPackaging = await packagingService.update(
      id,
      description,
      cost
    );

    res.status(200).json({ updatedPackaging });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteById = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);

  try {
    await packagingService.deleteById(id);

    res.status(200).json({ message: "Deletado com sucesso!" });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
