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
  const taxes = await prisma.tax.findMany({
    orderBy: {
      description: "asc",
    },
  });

  return taxes;
};

export const readById = async (id: number) => {
  const tax = await prisma.tax.findUnique({ where: { id: id } });

  return tax;
};

export const update = async (
  id: number,
  description: string,
  percent: string
) => {
  const updatedTax = await prisma.tax.update({
    where: { id: id },
    data: {
      description: description,
      percent: percent,
    },
  });

  return updatedTax;
};

export const deleteById = async (id: number) => {
  await prisma.tax.delete({ where: { id: id } });
};
