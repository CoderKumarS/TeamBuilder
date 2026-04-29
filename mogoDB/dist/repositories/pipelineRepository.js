import { User } from '../models/User.js';
import logger from '../utils/logger.js';
export const getUsersWithOrderDetails = async () => {
    logger.info('Running join pipeline: users with orders');
    return await User.aggregate([
        {
            $lookup: {
                from: 'orders',
                localField: '_id',
                foreignField: 'userId',
                as: 'userOrders'
            }
        },
        {
            $project: {
                name: 1,
                email: 1,
                orderCount: { $size: '$userOrders' },
                totalSpent: { $sum: '$userOrders.amount' }
            }
        }
    ]);
};
export const getDenormalizedOrders = async () => {
    logger.info('Running denormalization pipeline: unwinding orders');
    return await User.aggregate([
        {
            $lookup: {
                from: 'orders',
                localField: '_id',
                foreignField: 'userId',
                as: 'order'
            }
        },
        { $unwind: '$order' },
        {
            $project: {
                userName: '$name',
                product: '$order.product',
                amount: '$order.amount',
                category: '$order.category'
            }
        }
    ]);
};
//# sourceMappingURL=pipelineRepository.js.map