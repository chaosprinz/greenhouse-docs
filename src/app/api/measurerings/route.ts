import { MeasuringInput } from "@/lib/data/measurings/types";
import {
  getMeasuringsResponse,
  postMeasuringResponse,
} from "@/lib/responses/measurings";

export const GET = () => getMeasuringsResponse();

export async function POST(req: Request) {
  const formData = await req.formData();

  const input: MeasuringInput = {
    temperature: parseInt(formData.get("temperature")?.toString() ?? ""),
    humidity: parseInt(formData.get("humidity")?.toString() ?? ""),
    growId: parseInt(formData.get("growId")?.toString() ?? "-1"),
  };

  return postMeasuringResponse(input);
}
