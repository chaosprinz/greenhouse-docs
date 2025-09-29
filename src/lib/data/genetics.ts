import db from "@/db";
import { genetics } from "@/db/schema";
import { eq } from "drizzle-orm";
import { Genetic, GeneticIncludes, GeneticInput, Genetics } from "./types";
import { dbResult } from "./dbResult";
import { NotFoundError } from "./errors";
import { AwsDataApiPgDatabase } from "drizzle-orm/aws-data-api/pg";

export async function getGenetics(
  includes?: GeneticIncludes
): Promise<Genetics> {
  const result = await db.query.genetics.findMany({ with: includes });

  if (result.length <= 0) {
    throw new NotFoundError({
      entity: "grows",
    });
  }

  return dbResult(true, result);
}

export async function getGenetic(
  id: number,
  includes?: GeneticIncludes
): Promise<Genetic> {
  const result = await db.query.genetics.findFirst({
    where: eq(genetics.id, id),
    with: includes,
  });

  if (!result) {
    throw new NotFoundError({
      entity: "genetics",
      id,
    });
  }

  return dbResult(true, result);
}

export async function createGenetic(
  input: GeneticInput,
  includes: GeneticIncludes
): Promise<Genetic> {
  const insertId = await db.insert(genetics).values(input).$returningId();
  const newGenetic = await db.query.genetics.findFirst({
    where: eq(genetics.id, insertId[0].id),
    with: includes,
  });

  if (!newGenetic) {
    throw new NotFoundError({
      entity: "grows",
      id: insertId[0].id,
    });
  }

  return dbResult(true, newGenetic);
}
