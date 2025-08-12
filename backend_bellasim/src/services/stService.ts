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

export const update = async (
  id: number,
  description: string,
  percent: string
) => {
  const updatedSt = await prisma.sT.update({
    where: { id: id },
    data: {
      description: description,
      percent: percent,
    },
  });

  return updatedSt;
};

export const deleteById = async (id: number) => {
  await prisma.sT.delete({ where: { id: id } });
};
