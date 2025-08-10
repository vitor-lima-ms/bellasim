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
