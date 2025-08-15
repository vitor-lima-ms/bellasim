import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class StService {
  private constructor() {}

  static async create(description: string, percent: string) {
    const st = await prisma.sT.create({
      data: {
        description: description,
        percent: percent,
      },
    });

    return st;
  }

  static async read() {
    const sts = await prisma.sT.findMany({
      orderBy: {
        description: "asc",
      },
    });

    return sts;
  }

  static async readById(id: number) {
    const st = await prisma.sT.findUnique({ where: { id: id } });

    return st;
  }

  static async update(id: number, description: string, percent: string) {
    const updatedSt = await prisma.sT.update({
      where: { id: id },
      data: {
        description: description,
        percent: percent,
      },
    });

    return updatedSt;
  }

  static async deleteById(id: number) {
    await prisma.sT.delete({ where: { id: id } });
  }
}
