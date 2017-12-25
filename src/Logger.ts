import * as moment from 'moment';

export enum LEVEL {
  FATAL = 1, ERROR, WARN, INFO, DEBUG, TRACE
}

/**
 * The ILogger interface methods.
 */
export interface ILogger {
  log(message: string, level: LEVEL, options?: any): void;

  fatal(message: string, options?: any): void;

  error(message: string, options?: any): void;

  warn(message: string, options?: any): void;

  info(message: string, options?: any): void;

  debug(message: string, options?: any): void;

  trace(message: string, options?: any): void;
}

export interface LoggerOptions {
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
}

interface LogMessage {
  message: string;
  level: string;
  loggerName: string;
  options: any;
  datetime: string;
}

/**
 * The ILogger implemention.
 */
export abstract class Logger implements ILogger {

  private _loggerName: string;
  private _loggerLevel: number;

  public constructor(options: LoggerOptions) {
    this._loggerName = options.loggerName || 'UnnamedService';
    this._loggerLevel = options.loggerLevel || 0;
  }

  abstract async sendMessage(message: string, options?: any): Promise<boolean>;

  public log(message: string, level: LEVEL = LEVEL.INFO, options?: any): void {
    const logMessage: LogMessage = this._getLogMessage(message, level, options);
    this.sendMessage(JSON.stringify(logMessage), options).catch(_ => _);
    this._printMessage(level, logMessage);
  }

  public fatal(message: string, options?: any): void {
    this.log(message, LEVEL.FATAL, options);
  }

  public error(message: string, options?: any): void {
    this.log(message, LEVEL.ERROR, options);
  }

  public warn(message: string, options?: any): void {
    this.log(message, LEVEL.WARN, options);
  }

  public info(message: string, options?: any): void {
    this.log(message, LEVEL.INFO, options);
  }

  public debug(message: string, options?: any): void {
    this.log(message, LEVEL.DEBUG, options);
  }

  public trace(message: string, options?: any): void {
    this.log(message, LEVEL.TRACE, options);
  }

  private _getLogMessage(message: string, level?: LEVEL, options?: any): LogMessage {
    const datetime: string = moment().format('YYYY-MM-DD HH:mm:ss.SSS');
    return {
      message,
      level: LEVEL[level],
      loggerName: this._loggerName,
      options,
      datetime
    };
  }

  private _printMessage(level: LEVEL, logMessage: LogMessage): void {
    if (level <= this._loggerLevel) {
      console.log(`[${logMessage.datetime}] [${this._loggerName}] [${logMessage.level}] ${logMessage.message}`);
    }
  }

}
