import type { Measuring } from "@/db/schema";
import LineChart from "./LineChart";

type TemperatureData = { createdAt: Date; temperature: number };
type HumidityData = { createdAt: Date; humidity: number };

export default function MeasuringCharts({
  measurings,
}: {
  measurings: Measuring[];
}) {
  const temperatures: TemperatureData[] =
    measurings.map((m) => ({
      createdAt: m.createdAt,
      temperature: m.temperature,
    })) ?? [];

  const humidities: HumidityData[] = measurings.map((m) => ({
    createdAt: m.createdAt,
    humidity: m.humidity,
  }));

  return (
    <div className="mt-5">
      <h3 className="pl-6 pb-2 font-bold text-base">Measurings-chart</h3>
      <LineChart
        measurings={temperatures}
        yAxisId="yTemp"
        valueKey="temperature"
        label="Temperature"
        title="Temperatures over time"
        units="°C"
      />

      <LineChart
        measurings={humidities}
        yAxisId="yHumidity"
        valueKey={"humidity"}
        label="Humidity"
        title="Humidity over time"
        units="%"
        borderColor="rgb(0, 0, 255)"
      />
    </div>
  );
}
