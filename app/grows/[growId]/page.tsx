import db from "@/db";
import { grows, measurings } from "@/db/schema";
import { eq, InferSelectModel } from "drizzle-orm";

function MeasuringItem(measuring: InferSelectModel<typeof measurings>) {
    const creation_date = measuring.created_at?.toLocaleDateString();
    const creation_time = measuring.created_at?.toLocaleTimeString();

    return (
        <li key={measuring.id} className="mt-3 list-disc">
            <h3 className="text-sm">created at: {creation_date} {creation_time}</h3>
            <div>
                <p>temperature: {measuring.temperature}</p>
                <p>humidity: {measuring.humidity}</p>
            </div>
        </li>
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
    
    return (
        <div>
            <h2 className="text-xl text-center border-b-2 border-amber-50 mb-4">{growData?.genetic?.name}</h2>
            <h3 >Measurings</h3>
            <ul>
                {growData?.measurings.map(MeasuringItem)}
            </ul>
        </div>
    );
};
