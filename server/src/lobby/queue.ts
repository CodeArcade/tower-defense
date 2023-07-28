import cuid2 from "@paralleldrive/cuid2";
import AsyncLock from "async-lock";
import { WSResponse } from "../utils/WSResponse";
import {
  ErrorMessage,
  JoinQueueResponse,
  LeaveQueueResponse,
  LobbyMessage,
  createError,
} from "tower-defense-shared/dist/messages";
import { cloneDeep } from "../utils/cloneDeep";
import { Game } from "../game/game";

export class Queue {
  private static instance: Queue;

  public readonly MAX_ROOM_SIZE = 4;
  private lock: AsyncLock;
  private queues: Map<string, string[]>;

  private constructor() {
    this.lock = new AsyncLock();
    this.queues = new Map();
  }

  static get() {
    if (!Queue.instance) {
      Queue.instance = new Queue();
    }
    return Queue.instance;
  }

  public async isUserInQueue(user: string): Promise<boolean> {
    return this.lock.acquire("queue", (): boolean => {
      for (const queue of this.queues.values()) {
        if (queue.includes(user)) {
          return true;
        }
      }
      return false;
    });
  }

  public async joinQueue(user: string): Promise<WSResponse<LobbyMessage>> {
    return this.lock.acquire(
      "queue",
      async (): Promise<WSResponse<LobbyMessage>> => {
        this.queues = new Map(
          [...this.queues.entries()].sort((a, b) => b[1].length - a[1].length)
        );

        let queue = [...this.queues.entries()].find(
          (queue) => queue[1].length + 1 <= this.MAX_ROOM_SIZE
        );

        if (queue) {
          queue[1].push(user);
          const clonedQueue = cloneDeep(queue);

          if (clonedQueue[1].length === this.MAX_ROOM_SIZE) {
            this.queues.delete(queue[0]);

            await Game.get().createDefault(clonedQueue);
          }

          return {
            recipient: clonedQueue[0],
            message: {
              type: "JoinQueueResponse",
              message: {
                capacity: this.MAX_ROOM_SIZE,
                count: clonedQueue[1].length,
                room: clonedQueue[0],
              },
            },
            roomAction: {
              room: clonedQueue[0],
              type: "join",
            },
          };
        }

        const queueId = cuid2.createId();
        this.queues.set(queueId, [user]);

        return {
          recipient: queueId,
          message: {
            type: "JoinQueueResponse",
            message: {
              capacity: this.MAX_ROOM_SIZE,
              count: 1,
              room: queueId,
            },
          },
          roomAction: {
            room: queueId,
            type: "join",
          },
        };
      }
    );
  }

  public leaveQueue(
    user: string,
    queueId: string
  ): Promise<WSResponse<LobbyMessage | ErrorMessage>> {
    return this.lock.acquire(
      "queue",
      (): WSResponse<LobbyMessage | ErrorMessage> => {
        const queue = this.queues.get(queueId);
        if (!queue) {
          return {
            message: createError("queue not found"),
            recipient: "",
          };
        }

        const index = queue.indexOf(user);
        if (index === -1) {
          return {
            message: createError("user not in queue"),
            recipient: "",
          };
        }
        queue.splice(index, 1);

        if (queue.length === 0) {
          this.queues.delete(queueId);
        }

        return {
          message: {
            type: "LeaveQueueResponse",
            message: {
              capacity: this.MAX_ROOM_SIZE,
              count: queue.length,
              user,
            },
          },
          recipient: queueId,
          roomAction: {
            room: queueId,
            type: "leave",
          },
        };
      }
    );
  }
}
