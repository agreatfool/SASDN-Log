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
