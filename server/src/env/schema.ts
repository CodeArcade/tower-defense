import { z } from "zod"

export const serverEnvSchema = z.object({
  NODE_ENV: z.enum(["development", "production"]),
  PORT: z.string().default("3030"),
})