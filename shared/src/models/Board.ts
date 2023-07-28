import { z } from "zod";
import { positionSchema } from "./Position";
import { trapSchema } from "./Trap";
import { skeletonSchema } from "./Skeleton";
import { rotationSchema } from "./Rotation";

// board has 7x7 size
// field goes from 1x1 to 6x6
// border is forest and village
export const boardSchema = z.object({
  /*
  0 1
  2 3
*/
  actionTaken: z.boolean(),
  position: z.number().min(0),
  hero: z.object({
    position: positionSchema,
  }),
  tower: z.object({
    position: positionSchema,
    health: z.number().min(0),
  }),
  village: z.object({
    health: z.number().min(0),
  }),
  graveyard: z.array(
    z.object({
      skeletons: z.array(skeletonSchema),
      traps: z.array(trapSchema),
    })
  ),
  skeletons: z.object({
    inForest: z.array(skeletonSchema),
    onBoard: z.array(skeletonSchema),
  }),
  traps: z.object({
    onBoard: z.array(trapSchema),
    inStash: z.array(trapSchema),
    destroyed: z.array(trapSchema),
  }),
  rotationArrows: z.array(
    z.object({
      position: positionSchema,
      rotation: rotationSchema,
    })
  ),
});

export type Board = z.infer<typeof boardSchema>;
export type Hero = Board["hero"];
