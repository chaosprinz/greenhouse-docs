// scripts/seed-measurings.ts
import { measurings } from "@/db/schema";
import { addMinutes, subHours } from "date-fns";

async function seedMeasurings() {
  const { default: db } = await import("../../db");
  const now = new Date();
  const tenHoursAgo = subHours(now, 10);

  const data = Array.from({ length: 100 }, () => {
    // Random time within the last 10 hours
    const offsetMinutes = Math.floor(Math.random() * (10 * 60)); // 0-600 minutes
    const createdAt = addMinutes(tenHoursAgo, offsetMinutes);

    return {
      temperature: Math.floor(20 + Math.random() * 5), // 20-25°C
      humidity: Math.floor(40 + Math.random() * 20), // 40-60%
      createdAt, // explicitly set to avoid default NOW()
      growId: 1, // Change to your grow ID
    };
  });

  await db.insert(measurings).values(data);

  // eslint-disable-next-line no-console
  console.log(`✅ Inserted ${data.length} dummy measurings`);
}

seedMeasurings()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
