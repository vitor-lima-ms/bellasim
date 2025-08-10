import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const create = async (description: string, cost: string) => {
  const existingBaleBag = await prisma.baleBag.create({
    data: {
      description: description,
      cost: cost,
    },
  });

  return existingBaleBag;
};
