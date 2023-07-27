import { z } from "zod";
import { lobbyEventSchema } from "../events";

export const joinQueueRequestSchema = z.object({
  user: z.string(),
});

export const joinQueueResponseSchema = z.object({
  capacity: z.number(), // wie viele spieler können maximal in der queue sein
  count: z.number(), // wie viele spieler sind aktuell in der queue
  room: z.string(),
});

export type JoinQueueRequest = z.infer<typeof joinQueueRequestSchema>;
export type JoinQueueResponse = z.infer<typeof joinQueueResponseSchema>;
