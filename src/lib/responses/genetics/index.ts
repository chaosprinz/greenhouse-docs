import { createGenetic, getGenetic, getGenetics } from "@/lib/data";
import { responseFactory } from "../responseFactory";
import { GeneticSchema } from "@/lib/data/zodSchemas/GeneticSchema";

export const getGeneticResponse = responseFactory(getGenetic);
export const getGeneticsResponse = responseFactory(getGenetics);
export const postGeneticResponse =
  responseFactory(createGenetic).withValidation(GeneticSchema);
