import db from "@/db";
import { grows, Measuring} from "@/db/schema";
import { eq } from "drizzle-orm";
import LineChart from "../_components/LineChart";

type TemperatureData = { createdAt: Date; temperature: number;};
type HumidityData = { createdAt: Date; humidity: number;};

function MeasuringItem({measuring}: {measuring: Measuring}) {
    const creationDate = measuring.createdAt?.toLocaleDateString();
    const creationTime = measuring.createdAt?.toLocaleTimeString();

    return (
        <div className="mt-3 list-disc">
            <h3 className="text-sm">created at: {creationDate} {creationTime}</h3>
            <div>
                <p>temperature: {measuring.temperature}</p>
                <p>humidity: {measuring.humidity}</p>
            </div>
        </div>
    )
}

export default async function Grow({
    params
}: {
    params: Promise<{growId: number}>
}) {
    const growData = await db.query.grows.findFirst({
        where: eq(grows.id, (await params).growId),
        with: {
            measurings: true,
            genetic: true,
        },
    });

    const sortedMeasurings: Measuring[] = growData?.measurings
        .sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime()) ?? [] 

    const temperatures: TemperatureData[] = sortedMeasurings.map(m => ({
        createdAt: m.createdAt,
        temperature: m.temperature
    })) ?? [];

    const humidities: HumidityData[] = sortedMeasurings.map(m => ({
        createdAt: m.createdAt,
        humidity: m.humidity,
    }));

    return (
        <div>
            <h2 className="text-xl text-center border-b-2 border-amber-50 mb-4">{growData?.genetic?.name}</h2>
            <div>
                <h3 >Last Measuring</h3>
                <MeasuringItem measuring={sortedMeasurings[0]} />
            </div>

            <div>
                <h3>Measurings-chart</h3>
                <LineChart 
                    measurings={ temperatures } 
                    yAxisId="yTemp" 
                    valueKey="temperature" 
                    label="Temperature"
                    title="Temperatures over time"
                    units="°C"
                />

                <LineChart
                    measurings={ humidities }
                    yAxisId="yHumidity"
                    valueKey={ "humidity" }
                    label="Humidity"
                    title="Humidity over time"
                    units="%"
                    borderColor="rgb(0, 0, 255)"
                />
            </div>
        </div>
    );
};
