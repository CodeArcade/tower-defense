import { z } from "zod";
import { playerSchema } from "./Player";
import { boardSchema } from "./Board";

export const gameSchema = z.object({
  turnsPlayed: z.number(),
  boards: z.record(boardSchema),
  phase: z.object({
    type: z.enum([
      "none", // created default state before it is sent to players
      "pregame", // give players a few seconds to check boards state, can be skipped if all confirm
      "hero-movement",
      "trap",
      "skeleton-movement",
      "trap-handling",
      "rotation-arrow-handling",
      "skeleton-distribution", // this is after skeletons moved when players distribute skeletons to other graveyards
      "skeleton-spawn",
      "game-end", // game is over, show results
    ]),
    startTime: z.date(),
    duration: z.number(),
  }),
  players: z.record(playerSchema),
});

export type Game = z.infer<typeof gameSchema>;
export type Phase = Game["phase"];
