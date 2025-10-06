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
    // an array of {id:number}
    const insertId = await db
      .insert(genetics)
      .values({
        name: input.name,
        breeder: input.breeder,
        genus: input.genus,
        type: input.type,
        productPage: input.productPage ? input.productPage : undefined,
      })
      .$returningId();

    /**
     * we created only one genetic, so insertId only has one element
     * we take id from this element to fetch the new created genetic
     * from the database
     */
    const newGenetic = await db.query.genetics.findFirst({
      where: eq(genetics.id, insertId[0].id),
      with: includes,
    });

    // we throw a NotFoundError when there is no result
    if (!newGenetic) {
      throw new NotFoundError({
        entity: "grows",
        id: insertId[0].id,
      });
    }

    //we return a dbResult of our new Genetic
    return dbResult<GeneticWith<Includes>>(
      true,
      newGenetic as unknown as GeneticWith<Includes>
    );
  } catch (err) {
    //just delegating exceptions to be rethrown as DbError
    const error = toDbError(err);
    throw error;
  }
}
