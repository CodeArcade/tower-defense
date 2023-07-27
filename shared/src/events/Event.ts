import { z } from "zod";

export const eventSchema = z.enum(["Lobby", "Game"]);
export type Event = z.infer<typeof eventSchema>;
