import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const create = async (description: string, percent: string) => {
  const commission = await prisma.commission.create({
    data: {
      description: description,
      percent: percent,
    },
  });

  return commission;
};

export const read = async () => {
  const commissions = await prisma.commission.findMany();

  return commissions;
};

export const readById = async (id: number) => {
  const commission = await prisma.commission.findUnique({ where: { id: id } });

  return commission;
};

export const update = async (
  id: number,
  description: string,
  percent: string
) => {
  const updatedCommision = await prisma.commission.update({
    where: { id: id },
    data: {
      description: description,
      percent: percent,
    },
  });

  return updatedCommision;
};

export const deleteById = async (id: number) => {
  await prisma.commission.delete({ where: { id: id } });
};
