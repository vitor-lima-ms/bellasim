import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class RawMaterialService {
  private constructor() {}

  static async create(name: string, unit: string, unitCost: string) {
    const rawMaterial = await prisma.rawMaterial.create({
      data: {
        name: name,
        unit: unit,
        unitCost: unitCost,
      },
    });

    return rawMaterial;
  }

  static async read() {
    const rawMaterials = await prisma.rawMaterial.findMany({
      orderBy: {
        name: "asc",
      },
    });

    return rawMaterials;
  }

  static async readById(id: number) {
    const rawMaterial = await prisma.rawMaterial.findUnique({
      where: { id: id },
    });

    return rawMaterial;
  }

  static async update(
    id: number,
    name: string,
    unit: string,
    unitCost: string
  ) {
    const updatedRawMaterial = await prisma.rawMaterial.update({
      where: { id: id },
      data: {
        name: name,
        unit: unit,
        unitCost: unitCost,
      },
    });

    return updatedRawMaterial;
  }

  static async deleteById(id: number) {
    await prisma.rawMaterial.delete({ where: { id: id } });
  }
}
