import { z } from "zod";

export const galleryEventSchema = z.object({
  title: z.string().min(2, "Event title must be at least 2 characters"),

  imageUrl: z.string().url("Please provide a valid image URL"),

  publicId: z.string().min(1, "Cloudinary public ID is required"),

  googlePhotosUrl: z
    .string()
    .url("Please provide a valid Google Photos URL"),

  order: z.number().int().min(1, "Order must be at least 1"),
});
