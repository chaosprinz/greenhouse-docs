import db from "@/db";

export const getGrowsWithGenetic = async () => {
  return db.query.grows.findMany({
    with: {
      genetic: true,
    },
  });
};

export type GrowsWithGenetic = Awaited<ReturnType<typeof getGrowsWithGenetic>>;
export type GrowWithGenetic = GrowsWithGenetic[number];
