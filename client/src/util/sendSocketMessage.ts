import { Message } from "tower-defense-shared/dist/Messages";
import { Socket } from "../App";
import { Event } from "tower-defense-shared/dist/events";

export const sendSocketMessage = <T extends Message>(
  socket: Socket,
  event: Event,
  messageType: T["type"],
  message: T["message"]
) => {
  socket.send(event, {
    type: messageType,
    message,
  });
};
