import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class ContributionMarginService {
  private constructor() {}

  static async create(description: string, percent: string) {
    const contributionMargin = await prisma.contributionMargin.create({
      data: {
        description: description,
        percent: percent,
      },
    });

    return contributionMargin;
  }

  static async read() {
    const contributionMargins = await prisma.contributionMargin.findMany({
      orderBy: {
        description: "asc",
      },
    });

    return contributionMargins;
  }

  static async update(id: number, description: string, percent: string) {
    const updateContributionMargin = await prisma.contributionMargin.update({
      where: { id: id },
      data: {
        description: description,
        percent: percent,
      },
    });

    return updateContributionMargin;
  }

  static async readById(id: number) {
    const contributionMargin = await prisma.contributionMargin.findUnique({
      where: { id: id },
    });

    return contributionMargin;
  }

  static async deleteById(id: number) {
    await prisma.contributionMargin.delete({ where: { id: id } });
  }
}
