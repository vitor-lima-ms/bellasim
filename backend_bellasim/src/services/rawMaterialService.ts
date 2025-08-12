import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const create = async (name: string, unit: string, unitCost: string) => {
  const rawMaterial = await prisma.rawMaterial.create({
    data: {
      name: name,
      unit: unit,
      unitCost: unitCost,
    },
  });

  return rawMaterial;
};
