import { PgVarchar } from "drizzle-orm/pg-core";
import { errorData } from "./errors/types";
import { Grow as GrowSchema, Genetic as GeneticSchema } from "@/db/schema";

/**
 * ## DbResult
 */
export type DbResult<T> =
  | { success: true; type: "ok"; data: T }
  | { success: false; type: "error"; error: errorData };

/**
 * ## Genetics
 */

export type Genetics = DbResult<GeneticSchema[]>;
export type Genetic = DbResult<GeneticSchema>;

export type GeneticIncludes = {
  grows: true | undefined;
};

export type GeneticInput = {
  name: string;
  breeder: string;
  genus: string;
  type: string;
  productPage?: string;
};

/**
 * ## Grows
 */

export type Grows = DbResult<GrowSchema[]>;
export type Grow = DbResult<GrowSchema>;

export type GrowIncludes = {
  imageUploads: true | undefined;
  genetic: true | undefined;
  measurings: true | undefined;
};

export type GrowInput = {
  geneticId: number;
  createdAt?: number;
};

export type GrowCreated = DbResult<GrowSchema>;
