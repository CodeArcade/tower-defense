import { z } from "zod";
import { joinQueueRequestSchema, joinQueueResponseSchema } from "./JoinQueue";
import { lobbyEventSchema } from "../events/LobbyEvent";
import {
  leaveQueueRequestSchema,
  leaveQueueResponseSchema,
} from "./LeaveQueue";

export const lobbyMessageSchema = z.discriminatedUnion("type", [
  z.object({
    type: z.literal(lobbyEventSchema.Enum.JoinQueueRequest),
    message: joinQueueRequestSchema,
  }),
  z.object({
    type: z.literal(lobbyEventSchema.Enum.LeaveQueueRequest),
    message: leaveQueueRequestSchema,
  }),
  z.object({
    type: z.literal(lobbyEventSchema.Enum.JoinQueueResponse),
    message: joinQueueResponseSchema,
  }),
  z.object({
    type: z.literal(lobbyEventSchema.Enum.LeaveQueueResponse),
    message: leaveQueueResponseSchema,
  }),
]);

export type LobbyMessage = z.infer<typeof lobbyMessageSchema>;
