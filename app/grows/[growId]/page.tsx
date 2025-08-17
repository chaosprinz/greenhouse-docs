import db from "@/db";
import { grows, Measuring} from "@/db/schema";
import { eq } from "drizzle-orm";
import LineChart from "../_components/LineChart";
import Link from "next/link";
import { Url } from "next/dist/shared/lib/router/router";

type TemperatureData = { createdAt: Date; temperature: number;};
type HumidityData = { createdAt: Date; humidity: number;};

function MeasuringItem({measuring}: {measuring: Measuring}) {
    const creationDate = measuring.createdAt?.toLocaleDateString();
    const creationTime = measuring.createdAt?.toLocaleTimeString();

    return (
        <div>
            <p>created at: {creationDate} {creationTime}</p>
            <p>temperature: {measuring.temperature}</p>
            <p>humidity: {measuring.humidity}</p>
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
        <div className="pt-3 text-sm">
            <h2 className="text-xl text-center border-b-2 border-amber-50 mb-4">{growData?.genetic?.name}</h2>
            <div className="grid grid-cols-2">
                <div>
                    <div>
                        <h3 className="pl-6 pb-2 font-bold text-base">Genetic</h3>
                        <div>
                            <p>Name: {growData?.genetic?.name}</p>
                            <p>Breeder: {growData?.genetic?.breeder}</p>
                            <p>Genus: {growData?.genetic?.genus}</p>
                            <p>Type: {growData?.genetic?.type}</p>
                            <p className="mt-3">
                                <Link 
                                    href={growData?.genetic?.productPage as Url} 
                                    className="text-blue-400 hover:underline hover:text-blue-600 text-base"
                                    target="blank"
                                    rel="noopener noreferrer"
                                >
                                    Link to Product-page
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
                <div>
                    <div>
                        <h3 className="pl-6 pb-2 font-bold text-base">Last Measuring</h3>
                        <MeasuringItem measuring={sortedMeasurings[0]} />
                    </div>

                    <div className="mt-5">
                        <h3 className="pl-6 pb-2 font-bold text-base">Measurings-chart</h3>
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
            </div>
        </div>
    );
};
