import db from "@/db";
import { Genetic, genetics } from "@/db/schema";

export async function getAllGenetics(): Promise<Genetic[]> {
  return db.query.genetics.findMany();
}

export type GeneticData = {
  name: string;
  breeder: string;
  genus: string;
  type: string;
  productPage?: string;
};

export async function insertGenetic(genetic: GeneticData) {
  return db.insert(genetics).values(genetic).$returningId();
}
