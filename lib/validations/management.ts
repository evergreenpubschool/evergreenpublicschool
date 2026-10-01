import { z } from "zod";

export const managementSchema = z.object({
  name: z.string().min(2),
  designation: z.string().min(2),
  imageUrl: z.string().url(),
  publicId: z.string().min(1),
  order: z.number().int().min(1),
});