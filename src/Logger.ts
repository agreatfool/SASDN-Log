import * as moment from 'moment';
import { LEVEL } from './interface/BaseOptions';
import { LogOptions } from './interface/LogOptions';

/**
 * The ILogger interface methods.
 */
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

interface LogMessage {
  message: string;
  level: string;
  loggerName: string;
  options: LogOptions;
  datetime: string;
}

/**
 * The ILogger implemention.
 */
export abstract class Logger implements ILogger {

  private _logOptions: LogOptions;

  public constructor(options: LogOptions) {
    this._logOptions = options || {
      loggerName: 'UnnamedService',
      loggerLevel: 0
    };
  }

  abstract async sendMessage(message: string, options?: LogOptions): Promise<boolean>;

  public log(message: string, level: LEVEL = LEVEL.INFO, options?: LogOptions): void {
    const logOption: LogOptions = options ? Object.assign(this._logOptions, options)
      : (this._logOptions ? this._logOptions : undefined);
    const logMessage: LogMessage = this._format(message, level, logOption);
    this.sendMessage(JSON.stringify(logMessage), logOption).catch(_ => _);
    this._printMessage(level, logMessage);
  }

  public fatal(message: string, options?: LogOptions): void {
    this.log(message, LEVEL.FATAL, options);
  }

  public error(message: string, options?: LogOptions): void {
    this.log(message, LEVEL.ERROR, options);
  }

  public warn(message: string, options?: LogOptions): void {
    this.log(message, LEVEL.WARN, options);
  }

  public info(message: string, options?: LogOptions): void {
    this.log(message, LEVEL.INFO, options);
  }

  public debug(message: string, options?: LogOptions): void {
    this.log(message, LEVEL.DEBUG, options);
  }

  public trace(message: string, options?: LogOptions): void {
    this.log(message, LEVEL.TRACE, options);
  }

  private _format(message: string, level?: LEVEL, options?: LogOptions): LogMessage {
    const datetime: string = moment().format('YYYY-MM-DD HH:mm:ss.SSS');
    return {
      message,
      level: LEVEL[level],
      loggerName: this._logOptions.loggerName,
      options,
      datetime
    };
  }

  private _printMessage(level: LEVEL, logMessage: LogMessage): void {
    if (level <= this._logOptions.loggerLevel) {
      console.log(`[${logMessage.datetime}] [${this._logOptions.loggerName}] [${logMessage.level}] ${logMessage.message}`);
    }
  }

}
