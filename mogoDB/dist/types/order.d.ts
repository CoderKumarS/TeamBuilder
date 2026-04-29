import { Document, Schema } from 'mongoose';
export interface IOrder extends Document {
    userId: Schema.Types.ObjectId;
    product: string;
    amount: number;
    category: string;
    createdAt: Date;
}
//# sourceMappingURL=order.d.ts.map