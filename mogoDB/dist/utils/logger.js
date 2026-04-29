export var LogLevel;
(function (LogLevel) {
    LogLevel["INFO"] = "INFO";
    LogLevel["WARN"] = "WARN";
    LogLevel["ERROR"] = "ERROR";
    LogLevel["DEBUG"] = "DEBUG";
})(LogLevel || (LogLevel = {}));
class Logger {
    formatMessage(level, message) {
        const timestamp = new Date().toISOString();
        return `[${timestamp}] [${level}]: ${message}`;
    }
    info(message) {
        console.log(this.formatMessage(LogLevel.INFO, message));
    }
    warn(message) {
        console.warn(this.formatMessage(LogLevel.WARN, message));
    }
    error(message, error) {
        console.error(this.formatMessage(LogLevel.ERROR, message));
        if (error) {
            console.error(error);
        }
    }
    debug(message) {
        console.debug(this.formatMessage(LogLevel.DEBUG, message));
    }
}
export const logger = new Logger();
export default logger;
//# sourceMappingURL=logger.js.map