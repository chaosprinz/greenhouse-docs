import { getMeasuringResponse } from "@/lib/responses/measurings";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: number }> }
) {
  return await getMeasuringResponse((await params).id);
}
