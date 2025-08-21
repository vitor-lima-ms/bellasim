import { DiaperService } from "./diaperService";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class SimulationService {
  private constructor() {}

  static async registerSimulation(model: string, size: string) {
    const diaper = await DiaperService.readByModelSize(model, size);

    if (diaper) {
      const simulatedDiaper = await prisma.simulation.create({
        data: {
          simulatedDiaper: diaper,
        },
      });

      return simulatedDiaper;
    } else {
      throw new Error("Erro inesperado!");
    }
  }

  static async read() {
    const simulations = await prisma.simulation.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return simulations;
  }
}
