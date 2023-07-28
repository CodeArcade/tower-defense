import { z } from "zod";
import { positionSchema } from "./Position"
import { rotationSchema } from "./Rotation"

export const trapSchema = z.object({
    id: z.string(),
    currentUses: z.number(), // Infinity if indestructible
    position: positionSchema,
    rotation: rotationSchema
});

export type Trap = z.infer<typeof trapSchema>;
