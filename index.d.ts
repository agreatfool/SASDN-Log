export declare enum LEVEL {
  FATAL = 1,
  ERROR = 2,
  WARN = 3,
  INFO = 4,
  DEBUG = 5,
  TRACE = 6,
}

export interface BaseOptions {
  loggerName?: string;
  loggerLevel?: LEVEL;
}

export interface KafkaOptions extends BaseOptions {
  kafkaHost?: string;
  kafkaPort?: number;
  kafkaTopic?: string;
}

export declare enum TRANSPORT {
  TCP = 1,
  UDP = 2,
}

export interface SyslogOptions extends BaseOptions {
  syslogHost?: string;
  syslogPort?: number;
  transport?: TRANSPORT;
}

export declare type LogOptions = BaseOptions | KafkaOptions | SyslogOptions;

export interface ILogger {
  log(message: string, level: LEVEL, options?: LogOptions): void;

  fatal(message: string, options?: LogOptions): void;

  error(message: string, options?: LogOptions): void;

  warn(message: string, options?: LogOptions): void;

  info(message: string, options?: LogOptions): void;

  debug(message: string, options?: LogOptions): void;

  trace(message: string, options?: LogOptions): void;
}

export interface InitOptions {
  /**
   * Identifier, indicates who sends the log message.
   * The default value is 0.
   */
  loggerLevel?: number;
  /**
   * Used for debugging, if the log message's level less than or equal to `loggerLevel',
   * it will also be sent to the console.
   * The default value is 'UnnamedService'.
   */
  loggerName?: string;
  /**
   * Default LogOptions
   */
  logOptions?: LogOptions;
}

/**
 * The ILogger implemention.
 */
export declare abstract class Logger implements ILogger {
  private _logOptions;

  constructor(options: LogOptions);

  abstract sendMessage(message: string, options?: LogOptions): Promise<boolean>;

  log(message: string, level?: LEVEL, options?: LogOptions): void;

  fatal(message: string, options?: LogOptions): void;

  error(message: string, options?: LogOptions): void;

  warn(message: string, options?: LogOptions): void;

  info(message: string, options?: LogOptions): void;

  debug(message: string, options?: LogOptions): void;

  trace(message: string, options?: LogOptions): void;

  private _format(message, level?, options?);

  private _printMessage(level, logMessage);
}