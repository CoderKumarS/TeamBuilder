import { Schema, model } from 'mongoose';
const OrderSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    product: { type: String, required: true },
    amount: { type: Number, required: true },
    category: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
});
export const Order = model('Order', OrderSchema);
export default Order;
//# sourceMappingURL=Order.js.map