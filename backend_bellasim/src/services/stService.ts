import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const create = async (description: string, percent: string) => {
  const st = await prisma.tax.create({
    data: {
      description: description,
      percent: percent,
    },
  });

  return st;
};
