import db from "@/db";
import { grows } from "@/db/schema";
import { eq } from "drizzle-orm";
import { dbResult } from "./dbResult";
import { NotFoundError } from "./errors";
import { GrowIncludes, GrowInput, Grows, GrowWith, Grow } from "./types";

/**
 * ## getGrows
 * returns a dbResult for list of all avaiable grows
 * or throws a NotFoundError if result is empty
 */
export async function getGrows<Includes extends GrowIncludes = {}>(
  includes?: Includes
): Promise<Grows<Includes>> {
  const result = await db.query.grows.findMany({ with: includes });

  if (result.length <= 0) {
    throw new NotFoundError({
      entity: "grows",
    });
  }

  return dbResult<GrowWith<Includes>[]>(
    true,
    result as unknown as GrowWith<Includes>[]
  );
}

/**
 * ## getGrow(id, includes?)
 * returns DbResult for a single Grow, identified by the given id
 * or throws a NotFoundError if no result
 */
export async function getGrow<Includes extends GrowIncludes = {}>(
  id: number,
  includes?: Includes
): Promise<Grow<Includes>> {
  const result = await db.query.grows.findFirst({
    where: eq(grows.id, id),
    with: includes,
  });

  if (!result) {
    throw new NotFoundError({
      entity: "grows",
      id,
    });
  }

  return dbResult<GrowWith<Includes>>(
    true,
    result as unknown as GrowWith<Includes>
  );
}

/**
 * ## createGrow(growInput, includes?)
 * creates a new grow in the database
 * returns the newly created grow in a DbResult
 */
export async function createGrow<Includes extends GrowIncludes = {}>(
  growInput: GrowInput,
  includes?: Includes
): Promise<Grow<Includes>> {
  const insertId = await db
    .insert(grows)
    .values({ geneticId: growInput.geneticId })
    .$returningId();

  const newGrow = await db.query.grows.findFirst({
    where: eq(grows.id, insertId[0].id),
    with: includes,
  });

  if (!newGrow) {
    throw new NotFoundError({
      entity: "grows",
      id: insertId[0].id,
    });
  }

  return dbResult<GrowWith<Includes>>(
    true,
    newGrow as unknown as GrowWith<Includes>
  );
}
