import z from "zod";

export const GrowSchema = z.object({
  geneticId: z.number(),
  createdAt: z.number().optional(),
});
