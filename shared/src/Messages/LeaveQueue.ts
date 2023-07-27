import { z } from "zod";
import { lobbyEventSchema } from "../events";

export const leaveQueueRequestSchema = z.object({
  user: z.string(),
  room: z.string(),
});

export const leaveQueueResponseSchema = z.object({
  capacity: z.number(), // wie viele spieler können maximal in der queue sein
  count: z.number(), // wie viele spieler sind aktuell in der queue
  user: z.string(), // der user, der die queue verlassen hat
});

export type LeaveQueueRequest = z.infer<typeof leaveQueueRequestSchema>;
export type LeaveQueueResponse = z.infer<typeof leaveQueueResponseSchema>;
