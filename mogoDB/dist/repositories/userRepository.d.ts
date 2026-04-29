import { IUser } from '../types/user.js';
export declare const createUser: (userData: Partial<IUser>) => Promise<import("mongoose").Document<unknown, {}, IUser, {}, import("mongoose").DefaultSchemaOptions> & IUser & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}>;
export declare const findAllUsers: () => Promise<(import("mongoose").Document<unknown, {}, IUser, {}, import("mongoose").DefaultSchemaOptions> & IUser & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
})[]>;
export declare const findUserById: (id: string) => Promise<(import("mongoose").Document<unknown, {}, IUser, {}, import("mongoose").DefaultSchemaOptions> & IUser & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}) | null>;
export declare const updateUserById: (id: string, updateData: Partial<IUser>) => Promise<(import("mongoose").Document<unknown, {}, IUser, {}, import("mongoose").DefaultSchemaOptions> & IUser & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}) | null>;
export declare const deleteUserById: (id: string) => Promise<(import("mongoose").Document<unknown, {}, IUser, {}, import("mongoose").DefaultSchemaOptions> & IUser & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}) | null>;
//# sourceMappingURL=userRepository.d.ts.map