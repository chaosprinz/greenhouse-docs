import { DbError } from "./errors";
import { getGeneticWithGrows } from "./genetics";
import { getGrowsWithGenetic } from "./grows";

export type DbResult<T> =
  | { success: true; type: "ok"; data: T }
  | { success: false; type: "error"; error: DbError };

export type GeneticWithGrowsProps = {
  id: number;
};

export type GeneticWithGrows = Awaited<ReturnType<typeof getGeneticWithGrows>>;

export type GeneticsWithGrows = GeneticWithGrows[];

export type GrowsWithGenetic = Awaited<ReturnType<typeof getGrowsWithGenetic>>;
export type GrowWithGenetic = GrowsWithGenetic[number];
