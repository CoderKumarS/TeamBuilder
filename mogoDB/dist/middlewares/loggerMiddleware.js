import logger from '../utils/logger.js';
export const loggerMiddleware = (req, res, next) => {
    logger.info(`${req.method} ${req.url}`);
    next();
};
//# sourceMappingURL=loggerMiddleware.js.map