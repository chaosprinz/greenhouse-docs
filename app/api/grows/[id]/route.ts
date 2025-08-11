import db from "@/db";
import { grows } from "@/db/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";

export async function GET(request: Request, { params }: { params: Promise<{ id: number}>}) {
    const result = await db.query.grows.findFirst({
        where: eq(grows.id, (await params).id),
        with: {
            measurings: true,
        }
    });

    if (!result) return notFound();
    
    return Response.json(result);
};
