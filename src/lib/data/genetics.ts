import db from "@/db";
import { genetics } from "@/db/schema";
import { eq } from "drizzle-orm";
import {
  Genetic,
  GeneticIncludes,
  GeneticInput,
  Genetics,
  GeneticWith,
} from "./types";
import { dbResult } from "./dbResult";
import { NotFoundError, toDbError } from "./errors";
import { GeneticSchema } from "./zodSchemas/GeneticSchema";
import { validateInputFor } from "./validateInputFor";

export async function getGenetics<Includes extends GeneticIncludes = {}>(
  includes?: Includes
): Promise<Genetics<Includes>> {
  const result = await db.query.genetics.findMany({
    with: includes,
  });

  if (result.length <= 0) {
    throw new NotFoundError({
      entity: "genetics",
    });
  }

  return dbResult<GeneticWith<Includes>[]>(
    true,
    result as unknown as GeneticWith<Includes>[]
  );
}

export async function getGenetic<Includes extends GeneticIncludes>(
  id: number,
  includes?: Includes
): Promise<Genetic<Includes>> {
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

  return dbResult<GeneticWith<Includes>>(
    true,
    result as unknown as GeneticWith<Includes>
  );
}

export async function createGenetic<Includes extends GeneticIncludes>(
  input: GeneticInput,
  includes?: Includes
): Promise<Genetic<Includes>> {
  try {
    const validInput = validateInputFor(GeneticSchema, input, "Genetics");
    const insertId = await db
      .insert(genetics)
      .values({
        name: validInput.name,
        breeder: validInput.breeder,
        genus: validInput.genus,
        type: validInput.type,
        productPage: validInput.productPage
          ? validInput.productPage
          : undefined,
      })
      .$returningId();
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

    return dbResult<GeneticWith<Includes>>(
      true,
      newGenetic as unknown as GeneticWith<Includes>
    );
  } catch (err) {
    const error = toDbError(err);
    throw error;
  }
}
