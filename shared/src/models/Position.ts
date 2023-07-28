import { z } from "zod";

export const positionSchema = z.object({
  x: z.number().min(0),
  y: z.number().min(0),
})

export type Position = z.infer<typeof positionSchema>;