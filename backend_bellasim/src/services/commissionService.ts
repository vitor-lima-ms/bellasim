import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class CommissionService {
  private constructor() {}

  static async create(description: string, percent: string) {
    const commission = await prisma.commission.create({
      data: {
        description: description,
        percent: percent,
      },
    });

    return commission;
  }

  static async read() {
    const commissions = await prisma.commission.findMany({
      orderBy: {
        description: "asc",
      },
    });

    return commissions;
  }

  static async readById(id: number) {
    const commission = await prisma.commission.findUnique({
      where: { id: id },
    });

    return commission;
  }

  static async update(id: number, description: string, percent: string) {
    const updatedCommision = await prisma.commission.update({
      where: { id: id },
      data: {
        description: description,
        percent: percent,
      },
    });

    return updatedCommision;
  }

  static async deleteById(id: number) {
    await prisma.commission.delete({ where: { id: id } });
  }
}
