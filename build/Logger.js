"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const moment = require("moment");
const BaseOptions_1 = require("./interface/BaseOptions");
/**
 * The ILogger implemention.
 */
class Logger {
    constructor(options) {
        this._logOptions = options || {
            loggerName: 'UnnamedService',
            loggerLevel: 0
        };
    }
    log(message, level = BaseOptions_1.LEVEL.INFO, options) {
        const logOption = options ? Object.assign(this._logOptions, options)
            : (this._logOptions ? this._logOptions : undefined);
        const logMessage = this._format(message, level, logOption);
        this.sendMessage(JSON.stringify(logMessage), logOption).catch(_ => _);
        this._printMessage(level, logMessage);
    }
    fatal(message, options) {
        this.log(message, BaseOptions_1.LEVEL.FATAL, options);
    }
    error(message, options) {
        this.log(message, BaseOptions_1.LEVEL.ERROR, options);
    }
    warn(message, options) {
        this.log(message, BaseOptions_1.LEVEL.WARN, options);
    }
    info(message, options) {
        this.log(message, BaseOptions_1.LEVEL.INFO, options);
    }
    debug(message, options) {
        this.log(message, BaseOptions_1.LEVEL.DEBUG, options);
    }
    trace(message, options) {
        this.log(message, BaseOptions_1.LEVEL.TRACE, options);
    }
    _format(message, level, options) {
        const datetime = moment().format('YYYY-MM-DD HH:mm:ss.SSS');
        return {
            message,
            level: BaseOptions_1.LEVEL[level],
            loggerName: this._logOptions.loggerName,
            options,
            datetime
        };
    }
    _printMessage(level, logMessage) {
        if (level <= this._logOptions.loggerLevel) {
            console.log(`[${logMessage.datetime}] [${this._logOptions.loggerName}] [${logMessage.level}] ${logMessage.message}`);
        }
    }
}
exports.Logger = Logger;
