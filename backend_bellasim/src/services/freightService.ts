import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class FreightService {
  private constructor() {}

  static async create(description: string, percent: string) {
    const freight = await prisma.freight.create({
      data: {
        description: description,
        percent: percent,
      },
    });

    return freight;
  }

  static async read() {
    const freights = await prisma.freight.findMany({
      orderBy: {
        description: "asc",
      },
    });

    return freights;
  }

  static async readById(id: number) {
    const freight = await prisma.freight.findUnique({ where: { id: id } });

    return freight;
  }

  static async update(id: number, description: string, percent: string) {
    const updatedFreight = await prisma.freight.update({
      where: { id: id },
      data: {
        description: description,
        percent: percent,
      },
    });

    return updatedFreight;
  }

  static async deleteById(id: number) {
    await prisma.freight.delete({ where: { id: id } });
  }
}
