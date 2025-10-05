import z from "zod";

export const GrowSchema = z.object({
  geneticId: z.number(),
});
