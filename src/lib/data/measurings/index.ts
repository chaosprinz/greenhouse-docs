import db from "@/db";
import {
  Measuring,
  MeasuringIncludes,
  MeasuringInput,
  Measurings,
  MeasuringWith,
} from "./types";
import { NotFoundError } from "../errors";
import { dbResult } from "../dbResult";
import { eq } from "drizzle-orm";
import { grows, measurings } from "@/db/schema";

export async function getMeasurings<Includes extends MeasuringIncludes>(
  includes?: Includes
): Promise<Measurings<Includes>> {
  const result = await db.query.measurings.findMany({
    with: includes,
  });

  if (result.length <= 0) {
    throw new NotFoundError({ entity: "measurings" });
  }

  return dbResult<MeasuringWith<Includes>[]>(
    true,
    result as unknown as MeasuringWith<Includes>[]
  );
}

export async function getMeasuringsByGrow<Includes extends MeasuringIncludes>(
  growId: number,
  includes?: Includes
): Promise<Measurings<Includes>> {
  const result = await db.query.measurings.findMany({
    where: eq(grows.id, growId),
    with: includes,
  });

  if (result.length <= 0) {
    throw new NotFoundError({ entity: "measurings" });
  }

  return dbResult<MeasuringWith<Includes>[]>(
    true,
    result as unknown as MeasuringWith<Includes>[]
  );
}

export async function getMeasuring<Includes extends MeasuringIncludes>(
  id: number,
  includes?: Includes
): Promise<Measurings<Includes>> {
  const result = await db.query.measurings.findFirst({
    where: eq(measurings.id, id),
    with: includes,
  });

  if (!result) {
    throw new NotFoundError({
      entity: "measurings",
    });
  }

  return dbResult<MeasuringWith<Includes>[]>(
    true,
    result as unknown as MeasuringWith<Includes>[]
  );
}

export async function createMeasuring<Includes extends MeasuringIncludes>(
  measuringInput: MeasuringInput,
  includes?: Includes
): Promise<Measuring<Includes>> {
  const newMeasuring = await db
    .insert(measurings)
    .values({
      temperature: measuringInput.temperature,
      humidity: measuringInput.humidity,
      growId: measuringInput.growId,
    })
    .$returningId();

  const result = await db.query.measurings.findFirst({
    where: eq(measurings.id, newMeasuring[0].id),
    with: includes,
  });

  if (!result) {
    throw new NotFoundError({ entity: "measurings" });
  }

  return dbResult<MeasuringWith<Includes>>(
    true,
    result as unknown as MeasuringWith<Includes>
  );
}
