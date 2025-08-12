import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const create = async (description: string, cost: string) => {
  const baleBag = await prisma.baleBag.create({
    data: {
      description: description,
      cost: cost,
    },
  });

  return baleBag;
};

export const read = async () => {
  const baleBags = await prisma.baleBag.findMany();

  return baleBags;
};

export const readById = async (id: number) => {
  const baleBag = await prisma.baleBag.findUnique({ where: { id: id } });

  return baleBag;
};

export const update = async (id: number, description: string, cost: string) => {
  const updatedBaleBag = await prisma.baleBag.update({
    where: { id: id },
    data: {
      description: description,
      cost: cost,
    },
  });

  return updatedBaleBag;
};

export const deleteById = async (id: number) => {
  await prisma.baleBag.delete({ where: { id: id } });
};
