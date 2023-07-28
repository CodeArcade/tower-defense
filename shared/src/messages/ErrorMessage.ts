import { z } from "zod";

export const errorMessageSchema = z.object({
  type: z.literal("ErrorMessage"),
  message: z.string(),
});

export type ErrorMessage = z.infer<typeof errorMessageSchema>;

export function createError(message: string): ErrorMessage {
  return {
    type: "ErrorMessage",
    message,
  };
}
