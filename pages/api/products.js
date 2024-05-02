import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import cloudinary from "cloudinary";

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
export default async function handle(req, res) {
  const { method } = req;

  await mongooseConnect();

  if (method === "POST") {
    const {
      title,
      description,
      price,
      images,
      category,
      stock,
      brand,
      discount,
      rating,
      isDeliveryFree,
    } = req.body;

    const productDoc = await Product.create({
      title,
      description,
      price,
      images,
      thumbnail: images[0],
      category,
      brand,
      stock,
      discountPercentage: discount,
      rating,
      isDeliveryFree,
    });

    res.json(productDoc);
  }

  if (method === "GET") {
    if (req.query?.id) {
      res.json(await Product.findOne({ _id: req.query.id }));
    } else {
      res.json(await Product.find());
    }
  }

  if (method === "PUT") {
    const {
      _id,
      title,
      description,
      price,
      images,
      category,
      brand,
      stock,
      discount,
      rating,
      isDeliveryFree,
    } = req.body;
    await Product.updateOne(
      { _id },
      {
        title,
        description,
        price,
        images,
        thumbnail: images[0],
        category,
        brand,
        stock,
        discountPercentage: discount,
        rating,
        isDeliveryFree,
      }
    );
    res.json(true);
  }

  if (method === "DELETE") {
    if (req.query?.id) {
      const productToDelete = await Product.findOne({ _id: req.query?.id });
      const images = productToDelete?.images;
      const public_ids = [];

      images.forEach((image) => {
        const id = image
          .split("/upload/")[1]
          .split("/")
          .slice(1)
          .join("/")
          .split(".")[0];
        public_ids.push(id);
      });
      await cloudinary.v2.api.delete_resources(public_ids, {});
      await Product.deleteOne({ _id: req.query?.id });
      res.json(true);
    }
  }
}
