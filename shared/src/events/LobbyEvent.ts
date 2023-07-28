import { z } from "zod";

export const lobbyEventSchema = z.enum([
  "JoinLobbyRequest",
  "JoinLobbyResponse",
  "JoinQueueRequest",
  "JoinQueueResponse",
  "LeaveLobbyRequest",
  "LeaveLobbyResponse",
  "LeaveQueueRequest",
  "LeaveQueueResponse",
  "StartGameResponse",
]);

export type LobbyEvent = z.infer<typeof lobbyEventSchema>;
