import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const create = async (description: string, percent: string) => {
  const tax = await prisma.tax.create({
    data: {
      description: description,
      percent: percent,
    },
  });

  return tax;
};

export const read = async () => {
  const taxes = await prisma.tax.findMany();

  return taxes;
};

export const deleteById = async (id: number) => {
  await prisma.tax.delete({ where: { id: id } });
};
