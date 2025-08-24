import db from "@/db";
import { Genetic } from "@/db/schema";

export async function getAllGenetics(): Promise<Genetic[]> {
  const genetics = await db.query.genetics.findMany();

  return genetics;
}
