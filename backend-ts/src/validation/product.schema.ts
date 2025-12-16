import { z } from "zod";

export const productSchema = z.object({
  name: z.string().min(1).max(120),
  description: z.string().min(1).max(3000),
  price: z.coerce.number().positive(),
  category: z.string().max(120).optional(),
});

export type Product = z.infer<typeof productSchema>;
