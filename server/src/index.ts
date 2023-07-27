import { createServer } from "http";
import { Server } from "socket.io";
import { env } from "./env/server";
import { events, messages } from "tower-defense-shared";
import { match } from "ts-pattern";
import { handleLobbyEvent } from "./lobby";
import { Queue } from "./lobby/queue";
import { Message } from "tower-defense-shared/dist/Messages";

const httpServer = createServer();

const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

export type IO = typeof io;

io.on("connection", (socket) => {
  socket.on("message", (...args: [events.Event, Message]) => {
    const [messageType, payload] = args;
    match(messageType)
      .with("Lobby", async () => {
        const response = await handleLobbyEvent(
          payload as messages.LobbyMessage
        );

        if (response.roomAction?.type === "join") {
          socket.join(response.roomAction.room);
        }

        io.to(response.recipient).emit("Lobby", response.message);

        if (response.roomAction?.type === "leave") {
          socket.leave(response.roomAction.room);
        }
      })
      .with("Game", () => {
        // todo: handle game event
        throw new Error("not implemented");
      })
      .otherwise(() => {
        console.log("unknown message type", messageType);
      });
  });

  socket.on("disconnecting", (_: string) => {
    socket.rooms.forEach(async (room) => {
      const response = await Queue.get().leaveQueue(socket.id, room);
      io.to(room).emit("Lobby", await response.message);
    });
  });
});

const port = parseInt(env.PORT) || 3000;

console.log("starting server on port", port);
io.listen(port);
