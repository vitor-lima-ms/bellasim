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
  const rawMaterials = await prisma.rawMaterial.findMany({
    orderBy: {
      name: "asc",
    },
  });

  return rawMaterials;
};

export const readById = async (id: number) => {
  const rawMaterial = await prisma.rawMaterial.findUnique({
    where: { id: id },
  });

  return rawMaterial;
};

export const update = async (
  id: number,
  name: string,
  unit: string,
  unitCost: string
) => {
  const updatedRawMaterial = await prisma.rawMaterial.update({
    where: { id: id },
    data: {
      name: name,
      unit: unit,
      unitCost: unitCost,
    },
  });

  return updatedRawMaterial;
};

export const deleteById = async (id: number) => {
  await prisma.rawMaterial.delete({ where: { id: id } });
};
