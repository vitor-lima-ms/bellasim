import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const create = async (description: string, cost: string) => {
  const packaging = await prisma.packaging.create({
    data: {
      description: description,
      cost: cost,
    },
  });

  return packaging;
};

export const read = async () => {
  const packagings = await prisma.packaging.findMany({
    orderBy: {
      description: "asc",
    },
  });

  return packagings;
};

export const readById = async (id: number) => {
  const packaging = await prisma.packaging.findUnique({ where: { id: id } });

  return packaging;
};

export const update = async (id: number, description: string, cost: string) => {
  const updatedPackaging = await prisma.packaging.update({
    where: { id: id },
    data: {
      description: description,
      cost: cost,
    },
  });

  return updatedPackaging;
};

export const deleteById = async (id: number) => {
  await prisma.packaging.delete({ where: { id: id } });
};
