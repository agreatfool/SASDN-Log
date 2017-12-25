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
