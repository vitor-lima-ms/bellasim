import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class BaleBagService {
  private constructor() {}

  static async create(description: string, cost: string) {
    const baleBag = await prisma.baleBag.create({
      data: {
        description: description,
        cost: cost,
      },
    });

    return baleBag;
  }

  static async read() {
    const baleBags = await prisma.baleBag.findMany({
      orderBy: {
        description: "asc",
      },
    });

    return baleBags;
  }

  static async readById(id: number) {
    const baleBag = await prisma.baleBag.findUnique({ where: { id: id } });

    return baleBag;
  }

  static async update(id: number, description: string, cost: string) {
    const updatedBaleBag = await prisma.baleBag.update({
      where: { id: id },
      data: {
        description: description,
        cost: cost,
      },
    });

    return updatedBaleBag;
  }

  static async deleteById(id: number) {
    await prisma.baleBag.delete({ where: { id: id } });
  }
}