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

export const deleteById = async (id: number) => {
  await prisma.baleBag.delete({ where: { id: id } });
};
