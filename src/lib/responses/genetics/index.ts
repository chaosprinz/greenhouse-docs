import { createGenetic, getGenetic, getGenetics } from "@/lib/data";
import { responseFactory } from "../responseFactory";

export const getGeneticResponse = responseFactory(getGenetic);
export const getGeneticsResponse = responseFactory(getGenetics);
export const postGeneticResponse = responseFactory(createGenetic);
