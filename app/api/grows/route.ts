import db from "@/db";
import { notFound } from "next/navigation";

export async function GET(request: Request) {
    const result = await db.query.grows.findMany();

    if (!result) return notFound();
    
    return Response.json(result);
};
