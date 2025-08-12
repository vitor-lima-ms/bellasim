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

export const read = async () => {
  const rawMaterials = await prisma.rawMaterial.findMany();

  return rawMaterials;
};

export const deleteById = async (id: number) => {
  await prisma.rawMaterial.delete({ where: { id: id } });
};
