import * as userRepository from '../repositories/userRepository.js';
import asyncHandler from '../utils/asyncHandler.js';
export const createUser = asyncHandler(async (req, res) => {
    const user = await userRepository.createUser(req.body);
    res.status(201).json(user);
});
export const getUsers = asyncHandler(async (req, res) => {
    const users = await userRepository.findAllUsers();
    res.json(users);
});
export const getUserById = asyncHandler(async (req, res) => {
    const user = await userRepository.findUserById(req.params.id);
    if (!user) {
        const error = new Error('User not found');
        error.status = 404;
        throw error;
    }
    res.json(user);
});
export const updateUser = asyncHandler(async (req, res) => {
    const user = await userRepository.updateUserById(req.params.id, req.body);
    if (!user) {
        const error = new Error('User not found');
        error.status = 404;
        throw error;
    }
    res.json(user);
});
export const deleteUser = asyncHandler(async (req, res) => {
    const user = await userRepository.deleteUserById(req.params.id);
    if (!user) {
        const error = new Error('User not found');
        error.status = 404;
        throw error;
    }
    res.json({ message: 'User deleted' });
});
//# sourceMappingURL=crudController.js.map