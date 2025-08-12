import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const create = async (description: string, percent: string) => {
  const freight = await prisma.freight.create({
    data: {
      description: description,
      percent: percent,
    },
  });

  return freight;
};

export const read = async () => {
  const freights = await prisma.freight.findMany();

  return freights;
};

export const readById = async (id: number) => {
  const freight = await prisma.freight.findUnique({ where: { id: id } });

  return freight;
};

export const update = async (
  id: number,
  description: string,
  percent: string
) => {
  const updatedFreight = await prisma.freight.update({
    where: { id: id },
    data: {
      description: description,
      percent: percent,
    },
  });

  return updatedFreight;
};

export const deleteById = async (id: number) => {
  await prisma.freight.delete({ where: { id: id } });
};
