import db from "@/db";
import { grows, Measuring } from "@/db/schema";
import { eq } from "drizzle-orm";
import Genetic from "./_components/Genetic";
import { H2, H3 } from "@/app/_components/designElements";
import MeasuringCharts from "./_components/MeasuringCharts";

function MeasuringItem({ measuring }: { measuring: Measuring }) {
  const creationDate = measuring.createdAt?.toLocaleDateString();
  const creationTime = measuring.createdAt?.toLocaleTimeString();

  return (
    <div>
      <p>
        created at: {creationDate} {creationTime}
      </p>
      <p>temperature: {measuring.temperature}</p>
      <p>humidity: {measuring.humidity}</p>
    </div>
  );
}

export default async function Grow({
  params,
}: {
  params: Promise<{ growId: number }>;
}) {
  const growData = await db.query.grows.findFirst({
    where: eq(grows.id, (await params).growId),
    with: {
      measurings: true,
      genetic: true,
    },
  });

  const sortedMeasurings: Measuring[] =
    growData?.measurings.sort(
      (a, b) => a.createdAt.getTime() - b.createdAt.getTime()
    ) ?? [];

  return (
    <div className="pt-3 text-sm">
      <H2>{growData?.genetic?.name}</H2>
      <div className="grid grid-cols-2">
        <div>
          {growData?.genetic && <Genetic genetic={growData.genetic} />};
        </div>
        <div>
          {growData?.measurings && (
            <>
              <div>
                <H3>Last Measuring</H3>
                <MeasuringItem measuring={sortedMeasurings[0]} />
              </div>
              <MeasuringCharts measurings={sortedMeasurings} />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
