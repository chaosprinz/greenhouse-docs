import db from "@/db";
import { measurings } from "@/db/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";

export async function GET(request: Request, { params }: { params: Promise<{ id: number}>}) {
    const result = await db.query.measurings.findFirst({
        where: eq(measurings.id, (await params).id),
        with: {
            grow: true,
        }
    });

    if (!result) return notFound();
    
    return Response.json(result);
};
