// TODO: game message types

import { z } from "zod";
import { gameEventSchema } from "../events/GameEvent";
import { gameSchema } from "../models";

export const gameMessageSchema = z.discriminatedUnion("type", [
  z.object({
    type: z.literal(gameEventSchema.Enum.InitGame),
    message: gameSchema,
  }),
  z.object({
    type: z.literal(gameEventSchema.Enum.PhaseChanged),
    message: gameSchema,
  }),
]);

export type GameMessage = z.infer<typeof gameMessageSchema>;
