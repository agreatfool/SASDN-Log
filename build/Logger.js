"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const moment = require("moment");
var LEVEL;
(function (LEVEL) {
    LEVEL[LEVEL["FATAL"] = 1] = "FATAL";
    LEVEL[LEVEL["ERROR"] = 2] = "ERROR";
    LEVEL[LEVEL["WARN"] = 3] = "WARN";
    LEVEL[LEVEL["INFO"] = 4] = "INFO";
    LEVEL[LEVEL["DEBUG"] = 5] = "DEBUG";
    LEVEL[LEVEL["TRACE"] = 6] = "TRACE";
})(LEVEL = exports.LEVEL || (exports.LEVEL = {}));
/**
 * The ILogger implemention.
 */
class Logger {
    constructor(options) {
        this._loggerName = options.loggerName || 'UnnamedService';
        this._loggerLevel = options.loggerLevel || 0;
    }
    log(message, level = LEVEL.INFO, options) {
        const logMessage = this._getLogMessage(message, level, options);
        this.sendMessage(JSON.stringify(logMessage), options).catch(_ => _);
        this._printMessage(level, logMessage);
    }
    fatal(message, options) {
        this.log(message, LEVEL.FATAL, options);
    }
    error(message, options) {
        this.log(message, LEVEL.ERROR, options);
    }
    warn(message, options) {
        this.log(message, LEVEL.WARN, options);
    }
    info(message, options) {
        this.log(message, LEVEL.INFO, options);
    }
    debug(message, options) {
        this.log(message, LEVEL.DEBUG, options);
    }
    trace(message, options) {
        this.log(message, LEVEL.TRACE, options);
    }
    _getLogMessage(message, level, options) {
        const datetime = moment().format('YYYY-MM-DD HH:mm:ss.SSS');
        return {
            message,
            level: LEVEL[level],
            loggerName: this._loggerName,
            options,
            datetime
        };
    }
    _printMessage(level, logMessage) {
        if (level <= this._loggerLevel) {
            console.log(`[${logMessage.datetime}] [${this._loggerName}] [${logMessage.level}] ${logMessage.message}`);
        }
    }
}
exports.Logger = Logger;
