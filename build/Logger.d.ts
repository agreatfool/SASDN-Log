export declare enum LEVEL {
    FATAL = 1,
    ERROR = 2,
    WARN = 3,
    INFO = 4,
    DEBUG = 5,
    TRACE = 6,
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
/**
 * The ILogger implemention.
 */
export declare abstract class Logger implements ILogger {
    private _loggerName;
    private _loggerLevel;
    constructor(options: LoggerOptions);
    abstract sendMessage(message: string, options?: any): Promise<boolean>;
    log(message: string, level?: LEVEL, options?: any): void;
    fatal(message: string, options?: any): void;
    error(message: string, options?: any): void;
    warn(message: string, options?: any): void;
    info(message: string, options?: any): void;
    debug(message: string, options?: any): void;
    trace(message: string, options?: any): void;
    private _getLogMessage(message, level?, options?);
    private _printMessage(level, logMessage);
}
