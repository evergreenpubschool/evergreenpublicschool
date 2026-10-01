import { z } from "zod";

export const topperSchema = z.object({
  imageUrl: z.string().url(),
  publicId: z.string().min(1),
  year: z.number().int().min(2000),
  order: z.number().int().min(1),
});
