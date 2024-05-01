import { Timestamp } from "mongodb";
import mongoose, { model, Schema, models } from "mongoose";

const ProductSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    brand: { type: String },
    stock: { type: Number },
    rating: { type: Number },
    discountPercentage: { type: Number, default: 0 },
    images: [{ type: String }],
    thumbnail: { type: String },
    category: { type: String, default: "uncategorized" },
    isDeliveryFree: { type: Boolean },
  },
  { Timestamp: true }
);

// Pre-save hook to set thumbnail to the first image in the images array
// ProductSchema.pre("save", function (next) {
//   if (this.images && this.images.length > 0) {
//     this.thumbnail = this.images[0];
//   }
//   next();
// });

export const Product = models.Product || model("Product", ProductSchema);
