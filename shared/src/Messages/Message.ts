import { ErrorMessage } from "./ErrorMessage";
import { GameMessage } from "./GameMessage";
import { LobbyMessage } from "./LobbyMessage";

export type Message = ErrorMessage | LobbyMessage | GameMessage;
