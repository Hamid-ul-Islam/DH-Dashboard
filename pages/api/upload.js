import multiparty from "multiparty";
import cloudinary from "cloudinary";
import { mongooseConnect } from "@/lib/mongoose";

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default async function handle(req, res) {
  await mongooseConnect();
  const method = req.method;

  if (method === "POST") {
    const form = new multiparty.Form();
    const { fields, files } = await new Promise((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        if (err) reject(err);
        resolve({ fields, files });
      });
    });

    const links = [];
    for (const file of files.file) {
      const result = await cloudinary.v2.uploader.upload(file.path, {
        folder: "decorHeaven",
        public_id: `file_${Date.now()}`,
        resource_type: "auto",
      });

      const link = result.secure_url;
      links.push(link);
    }

    return res.json({ links });
  }

  if (method === "DELETE") {
    const public_id = req.query.img
      .split("/upload/")[1]
      .split("/")
      .slice(1)
      .join("/")
      .split(".")[0];

    await cloudinary.v2.uploader.destroy(public_id, {});
    res.json("Image deleted");
  }
}

export const config = {
  api: { bodyParser: false },
};
