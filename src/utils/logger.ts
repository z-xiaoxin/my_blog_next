// src/utils/logger.ts
type LogLevel = "debug" | "info" | "warn" | "error";

interface LogOptions {
  requestId?: string; // 可选，请求ID
}

const LOG_LEVELS: Record<LogLevel, number> = {
  debug: 0,
  info: 1,
  warn: 2,
  error: 3,
};

// 读取环境变量，控制日志开关
const ENV = process.env.NODE_ENV || "development";
const ENABLE_DEBUG = process.env.NEXT_PUBLIC_ENABLE_DEBUG === "true";
const CURRENT_LEVEL: LogLevel = ENABLE_DEBUG
  ? "debug"
  : ENV === "production"
  ? "info"
  : "debug";

function formatMessage(level: LogLevel, message: any, options?: LogOptions) {
  const timestamp = new Date().toISOString();
  const reqId = options?.requestId ? `[req:${options.requestId}]` : "";
  return `[${timestamp}] ${reqId} [${level.toUpperCase()}] ${message}`;
}

function shouldLog(level: LogLevel) {
  return LOG_LEVELS[level] >= LOG_LEVELS[CURRENT_LEVEL];
}

export const logger = {
  debug: (message: any, options?: LogOptions) => {
    if (shouldLog("debug"))
      console.debug(formatMessage("debug", message, options));
  },
  info: (message: any, options?: LogOptions) => {
    if (shouldLog("info"))
      console.info(formatMessage("info", message, options));
  },
  warn: (message: any, options?: LogOptions) => {
    if (shouldLog("warn"))
      console.warn(formatMessage("warn", message, options));
  },
  error: (message: any, options?: LogOptions) => {
    if (shouldLog("error"))
      console.error(formatMessage("error", message, options));
  },
};
