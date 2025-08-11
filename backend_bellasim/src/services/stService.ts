import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const create = async (description: string, percent: string) => {
  const st = await prisma.sT.create({
    data: {
      description: description,
      percent: percent,
    },
  });

  return st;
};

export const read = async () => {
  const sts = await prisma.sT.findMany();

  return sts;
};