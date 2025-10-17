import {
  createMeasuring,
  getMeasuring,
  getMeasurings,
  getMeasuringsByGrow,
} from "@/lib/data/measurings";
import { responseFactory } from "../responseFactory";
import { MeasuringSchema } from "@/lib/data/zodSchemas/MeasuringSchema";

export const getMeasuringResponse = responseFactory(getMeasuring);
export const getMeasuringsResponse = responseFactory(getMeasurings);
export const getMeasuringsByGrowResponse = responseFactory(getMeasuringsByGrow);
export const postMeasuringResponse =
  responseFactory(createMeasuring).withValidation(MeasuringSchema);
