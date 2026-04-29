import { User } from '../models/User.js';
import { Order } from '../models/Order.js';
import logger from '../utils/logger.js';
export const getUserAgeStatsByStatus = async (minAge) => {
    logger.info(`Running user age stats aggregation with minAge: ${minAge}`);
    return await User.aggregate([
        { $match: { age: { $gte: minAge } } },
        {
            $group: {
                _id: '$status',
                totalUsers: { $sum: 1 },
                averageAge: { $avg: '$age' }
            }
        }
    ]);
};
export const getOrderStatsByCategory = async () => {
    logger.info('Running order stats aggregation by category');
    return await Order.aggregate([
        {
            $group: {
                _id: '$category',
                totalSpent: { $sum: '$amount' },
                orderCount: { $sum: 1 }
            }
        },
        { $sort: { totalSpent: -1 } }
    ]);
};
//# sourceMappingURL=aggregationRepository.js.map