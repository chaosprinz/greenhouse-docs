import z from "zod";

export const GeneticSchema = z.object({
  name: z.string().min(1),
  breeder: z.string().min(1),
  genus: z.string().min(1),
  type: z.string().min(1),
  productPage: z.string().url().optional(),
});
