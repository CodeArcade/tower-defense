import { ZodFormattedError } from "zod";
import { serverEnvSchema } from "./schema";
import { config } from "dotenv";

config();

const _serverEnv = serverEnvSchema.safeParse(process.env);

export const formatErrors = (
  errors: ZodFormattedError<Map<string, string>, string>
) =>
  Object.entries(errors)
    .map(([name, value]) => {
      if (value && "_errors" in value)
        return `${name}: ${value._errors.join(", ")}\n`;
    })
    .filter(Boolean);

if (!_serverEnv.success) {
  console.error(
    "❌ Invalid environment variables:\n",
    ...formatErrors(_serverEnv.error.format())
  );
  throw new Error("Invalid environment variables");
}

export const env = _serverEnv.data;
