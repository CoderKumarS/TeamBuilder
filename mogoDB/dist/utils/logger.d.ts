export declare enum LogLevel {
    INFO = "INFO",
    WARN = "WARN",
    ERROR = "ERROR",
    DEBUG = "DEBUG"
}
declare class Logger {
    private formatMessage;
    info(message: string): void;
    warn(message: string): void;
    error(message: string, error?: any): void;
    debug(message: string): void;
}
export declare const logger: Logger;
export default logger;
//# sourceMappingURL=logger.d.ts.map