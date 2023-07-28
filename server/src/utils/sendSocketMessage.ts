import { Message } from "tower-defense-shared/dist/Messages";
import { Event } from "tower-defense-shared/dist/events";
import { IO } from "..";

export const sendSocketMessage = <T extends Message, M extends T["message"]>(
  socket: IO,
  recipient: string,
  event: Event,
  messageType: T["type"],
  message: M
) => {
  socket.to(recipient).emit(event, {
    type: messageType,
    message,
  });
};
