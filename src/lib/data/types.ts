import { errorData } from "./errors/types";
import {
  Grow as GrowSchema,
  Genetic as GeneticSchema,
  ImageUpload,
  Measuring,
} from "@/db/schema";

/**
 * ## withIncludes<Base, Includes, RelationMap>
 *
 * Input:
 * Base: unknown,
 * Includes: Record<string, true | undefined> with keys for Includes
 * RelationMap: Record<string, unknown> with keys for RelationMap
 *
 * Output:
 * Gives a type of Base holding Includes and a RelationMap.
 * Used for defining types with relations.
 * Example:
 * GeneticSchema: is the db-schema for genetics
 * Includes: are the relating Includes (grows)
 * GeneticRelationMap: obj like { grows?: true}
 * type GeneticWith<Includes extends GeneticIncludes = {}> = withIncludes<GeneticSchema , Includes, GeneticRelationMap>
 * returns a Genetic including relations as given in Includes
 */
export type withIncludes<
  Base,
  Includes extends Record<string, true | undefined>,
  RelationMap extends Record<string, unknown>,
> = Base & {
  [K in keyof Includes & keyof RelationMap as Includes[K] extends true
    ? K
    : never]: RelationMap[K];
};

/**
 * ## DbResult
 */
export type DbResult<T> =
  | { success: true; type: "ok"; data: T }
  | { success: false; type: "error"; error: errorData };

/**
 * ## Genetics
 * Types with options to include genetic-relations ({grows})
 */

export type GeneticIncludes = {
  grows?: true;
};

type GeneticRelationsMap = {
  grows: GrowSchema[];
};

/**
 * ### GeneticWith<Includes>
 * A genetic as from the database, which optionally holds its relations through Includes:
 * {grows?: true}
 */
export type GeneticWith<Includes extends GeneticIncludes = {}> = withIncludes<
  GeneticSchema,
  Includes,
  GeneticRelationsMap
>;

/**
 * ### Genetic<Includes>
 * A DbResult of a GeneticWith<Includes> Includes:
 * {grows?: true}
 */
export type Genetic<Includes extends GeneticIncludes = {}> = DbResult<
  GeneticWith<Includes>
>;

/**
 * ### Genetics<Includes>
 * A DbResult of an array of GeneticWith<Includes> (where Includes = {grows?: true})
 */
export type Genetics<Includes extends GeneticIncludes = {}> = DbResult<
  GeneticWith<Includes>[]
>;

/**
 * ### GeneticInput
 * meant as Input for Genetics as generated from formData
 */
export type GeneticInput = {
  name?: string;
  breeder?: string;
  genus?: string;
  type?: string;
  productPage?: string;
};

/**
 * ### ValidGeneticInput
 * meant as Input for creating new Genetics in the Database
 */
export type ValidGeneticInput = {
  name: string;
  breeder: string;
  genus: string;
  type: string;
  productPage?: string;
};

/**
 * ## Grows
 * types with option to include grow-relations
 * {
 *  imageUploads?: true,
 *  genetic?: true,
 *  measurings?: true
 *
 * } look GrowIncludes
 */

/**
 * ### GrowInput
 * meant as Input creating new Grows in the Database
 */
export type GrowInput = {
  geneticId: number;
  createdAt?: number;
};

/**
 * ### GrowIncludes
 * options to set grows to include include relations
 * grow-relations: {
 *  imageUploads?: true;
 *  genetic?: true;
 *  measurings?: true;
 * }
 */
export type GrowIncludes = {
  imageUploads?: true;
  genetic?: true;
  measurings?: true;
};

/**
 * ### GrowRelationsMap
 * returns grows with relations holding their type
 * grows-relation: {
 *  imageUploads?: ImageUpload[];
 *  genetic?: GeneticSchema;
 *  measurings?: Measuring[];
 * }
 */
export type GrowRelationsMap = {
  imageUploads?: ImageUpload[];
  genetic?: GeneticSchema;
  measurings?: Measuring[];
};

/**
 * ### GrowWith<Includes>
 * returns with Grows as they come from the database which
 * optionally include their relations in Includes
 * grow-relations: {
 *  imageUploads?: ImageUpload[];
 *  genetic?: GeneticSchema;
 *  measurings?: Measuring[];
 * }
 */
export type GrowWith<Includes extends GrowIncludes = {}> = withIncludes<
  GrowSchema,
  Includes,
  GrowRelationsMap
>;

/**
 * ### Grow<Includes>
 * is a DbResult for GrowWith
 */
export type Grow<Includes extends GrowIncludes = {}> = DbResult<
  GrowWith<Includes>
>;

/**
 * ### Grows<Includes>
 * is a DbResult for a GrowWith-array
 */
export type Grows<Includes extends GrowIncludes = {}> = DbResult<
  GrowWith<Includes>[]
>;
