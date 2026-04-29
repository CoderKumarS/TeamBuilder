import { Document } from 'mongoose';
import { UserStatus } from '../constants/user.js';
export interface IUser extends Document {
    name: string;
    email: string;
    age: number;
    status: UserStatus;
    createdAt: Date;
}
//# sourceMappingURL=user.d.ts.map