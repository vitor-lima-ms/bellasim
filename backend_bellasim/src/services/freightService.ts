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
