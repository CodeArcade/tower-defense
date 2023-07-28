import { z } from "zod";
import { positionSchema } from "./Position";
import { rotationSchema } from "./Rotation"

export const skeletonSchema = z.object({
  spawnpoint: positionSchema,
  position: positionSchema,
  rotation: rotationSchema,
  statusEffects: z.object({
    stunned: z.number(),
  }),
});

export type Skeleton = z.infer<typeof skeletonSchema>;
