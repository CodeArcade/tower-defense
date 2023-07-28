import { z } from "zod"

export const rotationSchema = z.enum(["up", "down", "left", "right"]);
