import { Request, Response } from "express";
import { SimulationService } from "../services/simulationService";

export class SimulationController {
  private constructor() {}

  static async registerSimulation(req: Request, res: Response) {
    const model = req.body.model;
    const size = req.body.size;

    try {
      const simulatedDiaper = await SimulationService.registerSimulation(
        model,
        size
      );

      res.status(200).json({ simulatedDiaper });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }
}
