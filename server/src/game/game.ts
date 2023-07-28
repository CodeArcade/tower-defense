import AsyncLock from "async-lock";
import { Game as GameState } from "tower-defense-shared/dist/models";
import { IO } from "..";
import { sendSocketMessage } from "../utils/sendSocketMessage";

export class Game {
  private static instance: Game;
  private lock: AsyncLock;
  private socket: IO;

  sessions: Map<string, GameState>;

  private constructor(socket: IO) {
    this.lock = new AsyncLock();
    this.sessions = new Map();
    this.socket = socket;
  }

  static create(socket: IO) {
    if (!this.instance) {
      this.instance = new Game(socket);
    }
    return this.instance;
  }

  static get() {
    if (!this.instance) {
      throw new Error("Game instance not created");
    }
    return this.instance;
  }

  public async createDefault(queue: [string, string[]]) {
    this.lock.acquire("game", () => {
      const [room, players] = queue;

      // creates a new game session
      this.sessions.set(room, {
        boards: players.reduce(
          (acc, player, i) => ({
            ...acc,
            [player]: {
              actionTaken: false,
              graveyard: [],
              hero: {
                position: {
                  x: 4,
                  y: 4,
                },
              },
              position: i,
              rotationArrows: [
                {
                  position: { x: 4, y: 2 },
                  rotation: "down",
                },
                {
                  position: { x: 4, y: 3 },
                  rotation: "down",
                },
                {
                  position: { x: 4, y: 5 },
                  rotation: "top",
                },
                {
                  position: { x: 4, y: 6 },
                  rotation: "down",
                },
                {
                  position: { x: 3, y: 4 },
                  rotation: "left",
                },
                {
                  position: { x: 5, y: 4 },
                  rotation: "right",
                },
              ],
              skeletons: [], // skeleton factory
              traps: [], // trap factory
              tower: {
                health: 4,
                position: {
                  x: 4,
                  y: 4,
                },
              },
              village: {
                health: 5,
              },
            },
          }),
          {}
        ),
        phase: {
          type: "none",
          duration: 0,
          startTime: new Date(),
        },
        players: players.reduce(
          (acc, player) => ({
            ...acc,
            [player]: {
              name: player,
              ready: false,
            },
          }),
          {}
        ),
        turnsPlayed: 0,
      });

      this.initGame(room);
    });
  }

  private initGame(room: string) {
    const game = this.sessions.get(room)!;
    game.phase.type = "pregame";
    game.phase.duration = 5;
    game.phase.startTime = new Date();

    sendSocketMessage(
      this.socket,
      room,
      "Game",
      "InitGame",
      game
    );

    setTimeout(() => {
      // TODO: send start game
    }, game.phase.duration * 1_000);
  }
}
