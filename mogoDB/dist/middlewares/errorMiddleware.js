import logger from '../utils/logger.js';
export const errorMiddleware = (err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || 'Internal Server Error';
    logger.error(`[Error] ${req.method} ${req.url}: ${message}`, err);
    res.status(status).json({
        success: false,
        status,
        message,
        stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
    });
};
//# sourceMappingURL=errorMiddleware.js.map