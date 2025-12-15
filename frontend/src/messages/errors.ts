// TODO: in real life would use i18n for translations, tried not overengineering this
export const ERROR_MESSAGES: Record<string, string> = {
  OPENAI_NOT_CONFIGURED: "Service temporarily unavailable",
  OPENAI_UNAUTHORIZED: "Service configuration error",
  OPENAI_RATE_LIMIT: "Too many requests. Please try again later.",
  OPENAI_TIMEOUT: "The request timed out. Please try again.",
  OPENAI_BAD_RESPONSE: "Failed to generate posts.",
  GENERATION_FAILED: "Failed to generate posts.",
  UNKNOWN_ERROR: "Something went wrong.",
};
