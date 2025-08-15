import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class TaxService {
  private constructor() {}

  static async create(description: string, percent: string) {
    const tax = await prisma.tax.create({
      data: {
        description: description,
        percent: percent,
      },
    });

    return tax;
  }

  static async read() {
    const taxes = await prisma.tax.findMany({
      orderBy: {
        description: "asc",
      },
    });

    return taxes;
  }

  static async readById(id: number) {
    const tax = await prisma.tax.findUnique({ where: { id: id } });

    return tax;
  }

  static async update(id: number, description: string, percent: string) {
    const updatedTax = await prisma.tax.update({
      where: { id: id },
      data: {
        description: description,
        percent: percent,
      },
    });

    return updatedTax;
  }

  static async deleteById(id: number) {
    await prisma.tax.delete({ where: { id: id } });
  }
}
