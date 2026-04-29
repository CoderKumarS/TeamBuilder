import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import crudRoutes from './routes/crudRoutes.js';
import aggregationRoutes from './routes/aggregationRoutes.js';
import pipelineRoutes from './routes/pipelineRoutes.js';
import logger from './utils/logger.js';
import { loggerMiddleware } from './middlewares/loggerMiddleware.js';
import { errorMiddleware } from './middlewares/errorMiddleware.js';
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;
// Middleware
app.use(express.json());
// Request logging middleware
app.use(loggerMiddleware);
// Database Connection
connectDB().then(() => {
    logger.info('Database connection sequence completed.');
}).catch((err) => {
    logger.error('Database connection sequence failed.', err);
});
// Routes
app.use('/api', crudRoutes);
app.use('/api', aggregationRoutes);
app.use('/api', pipelineRoutes);
// Health Check
app.get('/', (req, res) => {
    res.send('MongoDB Backend Sample is running with middleware-based logging...');
});
// Error handling middleware (MUST be after routes)
app.use(errorMiddleware);
app.listen(PORT, () => {
    logger.info(`Server is running on port ${PORT}`);
});
//# sourceMappingURL=index.js.map