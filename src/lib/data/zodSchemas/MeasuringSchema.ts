import z from "zod";

export const MeasuringSchema = z.object({
  temperature: z.number(),
  humidity: z.number(),
  growId: z.number(),
  createdAt: z.number().optional(),
});
