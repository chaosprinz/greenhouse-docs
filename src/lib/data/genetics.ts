import db from "@/db";
import { Genetic, genetics } from "@/db/schema";
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

export async function getGenetics(): Promise<Genetic[]> {
  const genetics: Genetic[] = await db.query.genetics.findMany();
  return genetics;
}

export type GeneticInput = {
  name: string;
  breeder: string;
  genus: string;
  type: string;
  productPage?: string;
};

export type GeneticInsertResult = {
  insertIds: number[];
  insertData: GeneticInput;
};
export async function createGenetic(
  GeneticData: GeneticInput
): Promise<GeneticInsertResult> {
  const result = await db.insert(genetics).values(GeneticData).$returningId();
  const insertIds: number[] = result.map((entry) => entry.id);
  const insertData: GeneticInput = GeneticData;
  return {
    insertIds,
    insertData,
  };
}
