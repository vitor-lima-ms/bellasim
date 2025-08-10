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
