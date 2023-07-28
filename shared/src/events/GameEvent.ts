import { z } from "zod";

export const gameEventSchema = z.enum(["InitGame", "PhaseChanged"]);

export type GameEvent = z.infer<typeof gameEventSchema>;
