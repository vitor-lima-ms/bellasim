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
  const contributionMargins = await prisma.contributionMargin.findMany({
    orderBy: {
      description: "asc",
    },
  });

  return contributionMargins;
};

export const update = async (
  id: number,
  description: string,
  percent: string
) => {
  const updateContributionMargin = await prisma.contributionMargin.update({
    where: { id: id },
    data: {
      description: description,
      percent: percent,
    },
  });

  return updateContributionMargin;
};

export const readById = async (id: number) => {
  const contributionMargin = await prisma.contributionMargin.findUnique({
    where: { id: id },
  });

  return contributionMargin;
};

export const deleteById = async (id: number) => {
  await prisma.contributionMargin.delete({ where: { id: id } });
};
