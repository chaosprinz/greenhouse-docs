import z from "zod";
import { MeasuringSchema } from "../zodSchemas/MeasuringSchema";
import { Grow as GrowData, Measuring as MeasuringData } from "@/db/schema";
import { DbResult, withIncludes } from "../types";

/**
 * # @Measurings
 * types with option to include measuring-relation
 * { grow?: true }
 */

/**
 * ## MeasuringInput
 * meant as input, when creating new measurings in the database
 */
export type MeasuringInput = z.infer<typeof MeasuringSchema>;

/**
 * ## MeasuringIncludes
 * options to set measurings to include relations
 */

export type MeasuringIncludes = {
  grow?: true;
};

/**
 * ## MeasuringRelationMap
 * measurings with relations mapped to their type
 */

export type MeasuringRelationMap = {
  grow?: GrowData;
};

/**
 * ## MeasuringWith
 * measruings as they come from the database,
 * which optionally include their relation in Includes
 */

export type MeasuringWith<Includes extends MeasuringIncludes> = withIncludes<
  MeasuringData,
  Includes,
  MeasuringRelationMap
>;

/**
 * ## Measuring<Includes>
 * is a DbResult for MeasuringWith
 */
export type Measuring<Includes extends MeasuringIncludes> = DbResult<
  MeasuringWith<Includes>
>;

/**
 * ## Measurings<Includes>
 * is a DbResult for a MeasuringWith-array
 */

export type Measurings<Includes extends MeasuringIncludes> = DbResult<
  MeasuringWith<Includes>[]
>;
