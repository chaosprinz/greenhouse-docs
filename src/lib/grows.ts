import db from "@/db";
import { grows } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function getGrowsWithGenetic() {
  return db.query.grows.findMany({
    with: {
      genetic: true,
    },
  });
}

export async function findGrowsById(id: number) {
  return db.query.grows.findMany({
    where: eq(grows.id, id),
  });
}

export async function growExists(id: number): Promise<boolean> {
  try {
    const grows = await findGrowsById(id);

    if (!grows || grows.length <= 0) {
      return false;
    }
    return true;
  } catch {
    return false;
  }
}

export type GrowsWithGenetic = Awaited<ReturnType<typeof getGrowsWithGenetic>>;
export type GrowWithGenetic = GrowsWithGenetic[number];
