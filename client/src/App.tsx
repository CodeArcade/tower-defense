import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { sendSocketMessage } from "./util/sendSocketMessage";
import {
  JoinQueueResponse,
  LobbyMessage,
} from "tower-defense-shared/dist/Messages";

const socket = io("http://localhost:3030");
export type Socket = typeof socket;

function App() {
  const [queue, setQueue] = useState<JoinQueueResponse | null>(null);

  useEffect(() => {
    socket.removeListener("Lobby");

    socket.on("Lobby", (data: LobbyMessage) => {
      switch (data.type) {
        case "JoinQueueResponse":
          setQueue(data.message);
          break;
        case "LeaveQueueResponse":
          const { user, ...newQueue } = data.message;
          if (user === socket.id) {
            setQueue(null);
          } else {
            setQueue({
              ...newQueue,
              room: queue!.room,
            });
          }
          break;
      }
    });
  }, [queue]);

  const handleQueue = () => {
    console.log("queue", queue);
    if (queue) {
      sendSocketMessage(socket, "Lobby", "LeaveQueueRequest", {
        user: socket.id,
        room: queue.room,
      });
    } else {
      sendSocketMessage(socket, "Lobby", "JoinQueueRequest", {
        user: socket.id,
      });
    }
  };

  return (
    <div className="App">
      <button onClick={handleQueue}>
        {queue ? "Leave Queue" : "Join Queue"}
      </button>
      {queue && (
        <span>
          Users in Queue: {queue.count} / {queue.capacity}
        </span>
      )}
    </div>
  );
}

export default App;
