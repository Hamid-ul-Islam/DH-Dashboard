import { model, models, Schema } from "mongoose";

const OrderSchema = new Schema(
  {
    totalAmount: String,
    line_items: Object,
    name: String,
    email: String,
    city: String,
    phone: String,
    address: String,
    paid: Boolean,
  },
  {
    timestamps: true,
  }
);

export const Order = models?.Order || model("Order", OrderSchema);
