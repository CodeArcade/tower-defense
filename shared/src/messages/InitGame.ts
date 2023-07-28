import { z } from "zod";
import { gameSchema } from "../models";

export const initGameSchema = gameSchema;

export type InitGame = z.infer<typeof initGameSchema>;
