import db from "@/db";
import { grows } from "@/db/schema";
import { eq } from "drizzle-orm";
import { dbResult } from "./dbResult";
import { NotFoundError } from "./errors";
import { Grow, GrowIncludes, GrowInput, Grows } from "./types";

export async function getGrows(includes?: GrowIncludes): Promise<Grows> {
  const result = await db.query.grows.findMany({ with: includes });

  if (result.length <= 0) {
    throw new NotFoundError({
      entity: "grows",
    });
  }

  return dbResult(true, result);
}

export async function getGrow(
  id: number,
  includes?: GrowIncludes
): Promise<Grow> {
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

  return dbResult(true, result);
}

export async function createGrow(growInput: GrowInput): Promise<Grow> {
  const insertId = await db
    .insert(grows)
    .values({ geneticId: growInput.geneticId })
    .$returningId();

  const newGrow = await db.query.grows.findFirst({
    where: eq(grows.id, insertId[0].id),
  });

  if (!newGrow) {
    throw new NotFoundError({
      entity: "grows",
      id: insertId[0].id,
    });
  }

  return dbResult(true, newGrow);
}
