import { createGrow, getGrow, getGrows } from "@/lib/data";
import { responseFactory } from "../responseFactory";

export const getGrowsResponse = responseFactory(getGrows);
export const getGrowResponse = responseFactory(getGrow);
export const postGrowResponse = responseFactory(createGrow);
