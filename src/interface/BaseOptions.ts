export enum LEVEL {
  FATAL = 1, ERROR, WARN, INFO, DEBUG, TRACE
}

export interface BaseOptions {
  loggerName?: string;
  loggerLevel?: LEVEL;
}