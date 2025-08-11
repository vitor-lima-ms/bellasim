import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const create = async (description: string, percent: string) => {
  const contributionMargin = await prisma.contributionMargin.create({
    data: {
      description: description,
      percent: percent,
    },
  });

  return contributionMargin;
};

export const read = async () => {
  const contributionMargins = await prisma.contributionMargin.findMany();

  return contributionMargins;
};
