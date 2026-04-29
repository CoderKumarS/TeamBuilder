import { User } from '../models/User.js';
import logger from '../utils/logger.js';
export const createUser = async (userData) => {
    logger.info(`Creating user: ${userData.email}`);
    const user = new User(userData);
    return await user.save();
};
export const findAllUsers = async () => {
    logger.info('Fetching all users');
    return await User.find();
};
export const findUserById = async (id) => {
    logger.info(`Fetching user by ID: ${id}`);
    return await User.findById(id);
};
export const updateUserById = async (id, updateData) => {
    logger.info(`Updating user ID: ${id}`);
    return await User.findByIdAndUpdate(id, updateData, { new: true });
};
export const deleteUserById = async (id) => {
    logger.info(`Deleting user ID: ${id}`);
    return await User.findByIdAndDelete(id);
};
//# sourceMappingURL=userRepository.js.map