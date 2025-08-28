import db from "@/db";
import { genetics } from "@/db/schema";
import { eq } from "drizzle-orm";

export type GeneticWithGrowsProps = {
  id: number;
};

export type GeneticWithGrows = Awaited<ReturnType<typeof getGeneticWithGrows>>;

export async function getGeneticWithGrows({ id }: GeneticWithGrowsProps) {
  const genetic = await db.query.genetics.findFirst({
    where: eq(genetics.id, id),
    with: {
      grows: true,
    },
  });
  return genetic;
}

export type GeneticsWithGrows = GeneticWithGrows[];

export async function getGeneticsWithGrows({}: GeneticWithGrowsProps): Promise<GeneticsWithGrows> {
  const genetics: GeneticsWithGrows = await db.query.genetics.findMany({
    with: { grows: true },
  });
  return genetics;
}
