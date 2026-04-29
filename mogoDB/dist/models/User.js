import { Schema, model } from 'mongoose';
import { UserStatus } from '../constants/user.js';
const UserSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    age: { type: Number, required: true },
    status: {
        type: String,
        enum: Object.values(UserStatus),
        default: UserStatus.ACTIVE
    },
    createdAt: { type: Date, default: Date.now },
});
export const User = model('User', UserSchema);
export default User;
//# sourceMappingURL=User.js.map