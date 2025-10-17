import db from "@/db";
import { measurings } from "@/db/schema";
import { getMeasuring } from "@/lib/data/measurings";
import { getMeasuringResponse } from "@/lib/responses/measurings";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: number }> }
) {
  return await getMeasuringResponse((await params).id);
}
