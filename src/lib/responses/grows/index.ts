import { createGrow, getGrow, getGrows } from "@/lib/data";
import { responseFactory } from "../responseFactory";
import { GrowSchema } from "@/lib/data/zodSchemas/GrowSchema";

export const getGrowsResponse = responseFactory(getGrows);
export const getGrowResponse = responseFactory(getGrow);
export const postGrowResponse =
  responseFactory(createGrow).withValidation(GrowSchema);
