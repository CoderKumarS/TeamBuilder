import * as pipelineRepository from '../repositories/pipelineRepository.js';
import asyncHandler from '../utils/asyncHandler.js';
// Advanced Pipeline: Join Users with their Orders
export const getUserOrders = asyncHandler(async (req, res) => {
    const usersWithOrders = await pipelineRepository.getUsersWithOrderDetails();
    res.json(usersWithOrders);
});
// Advanced Pipeline: Unwind orders for granular reporting
export const getUnwoundOrders = asyncHandler(async (req, res) => {
    const report = await pipelineRepository.getDenormalizedOrders();
    res.json(report);
});
//# sourceMappingURL=pipelineController.js.map