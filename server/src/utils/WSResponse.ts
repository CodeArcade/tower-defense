export type WSResponse<T> = {
  recipient: string;
  message: T;
  roomAction?: {
    type: "join" | "leave";
    room: string;
  }
};
