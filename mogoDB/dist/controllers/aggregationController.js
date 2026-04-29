import * as aggregationRepository from '../repositories/aggregationRepository.js';
import { DEFAULT_MIN_AGE } from '../constants/user.js';
import asyncHandler from '../utils/asyncHandler.js';
// Basic Aggregation: Group users by status and count them
export const getUserStats = asyncHandler(async (req, res) => {
    const minAgeSetting = req.query.minAge ? parseInt(req.query.minAge) : DEFAULT_MIN_AGE;
    const stats = await aggregationRepository.getUserAgeStatsByStatus(minAgeSetting);
    res.json(stats);
});
// Aggregation: Find top spending categories
export const getOrderStats = asyncHandler(async (req, res) => {
    const stats = await aggregationRepository.getOrderStatsByCategory();
    res.json(stats);
});
//# sourceMappingURL=aggregationController.js.map