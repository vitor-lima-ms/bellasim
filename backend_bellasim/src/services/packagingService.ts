import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class PackagingService {
  private constructor() {}

  static async create(description: string, cost: string) {
    const packaging = await prisma.packaging.create({
      data: {
        description: description,
        cost: cost,
      },
    });

    return packaging;
  }

  static async read() {
    const packagings = await prisma.packaging.findMany({
      orderBy: {
        description: "asc",
      },
    });

    return packagings;
  }

  static async readById(id: number) {
    const packaging = await prisma.packaging.findUnique({ where: { id: id } });

    return packaging;
  }

  static async update(id: number, description: string, cost: string) {
    const updatedPackaging = await prisma.packaging.update({
      where: { id: id },
      data: {
        description: description,
        cost: cost,
      },
    });

    return updatedPackaging;
  }

  static async deleteById(id: number) {
    await prisma.packaging.delete({ where: { id: id } });
  }
}
