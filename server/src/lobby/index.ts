import { messages } from "tower-defense-shared";
import { match } from "ts-pattern";
import { Queue } from "./queue";
import { WSResponse } from "../utils/WSResponse";
import {
  createError,
  joinQueueRequestSchema,
} from "tower-defense-shared/dist/messages";

export const handleLobbyEvent = async (
  nonVerifiedPayload: messages.LobbyMessage
): Promise<WSResponse<unknown>> => {
  let parsed = messages.lobbyMessageSchema.safeParse(nonVerifiedPayload);
  if (!parsed.success) {
    throw new Error(
      "invalid lobby message" + JSON.stringify(nonVerifiedPayload, null, 2)
    );
  }

  const payload = parsed.data;

  return match(payload)
    .with({ type: "JoinQueueRequest" }, (payload) => {
      return handleJoinQueue(payload.message);
    })
    .with({ type: "LeaveQueueRequest" }, (payload) => {
      return Queue.get().leaveQueue(payload.message.user, payload.message.room);
    })
    .otherwise(() => {
      console.log("unknown lobby message type", nonVerifiedPayload);
      return {
        message: null,
        recipient: "",
      };
    });
};

async function handleJoinQueue(payload: messages.JoinQueueRequest) {
  if (await Queue.get().isUserInQueue(payload.user)) {
    const errorMessage: WSResponse<messages.ErrorMessage> = {
      message: createError("Already in queue"),
      recipient: payload.user,
    };

    return errorMessage;
  }
  return Queue.get().joinQueue(payload.user);
}
