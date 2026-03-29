import dotenv from "dotenv";
dotenv.config();
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import path from "path";

const cloud_name = process.env.CLOUDINARY_CLOUD_NAME?.trim();
const api_key = process.env.CLOUDINARY_API_KEY?.trim();
const api_secret = process.env.CLOUDINARY_API_SECRET?.trim();

cloudinary.config({
  cloud_name,
  api_key,
  api_secret,
});

console.log("Cloudinary Config Loaded:", { cloud_name, api_key, api_secret_provided: !!api_secret });

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;
    
    // Normalize path for Windows compatibility
    const absolutePath = path.resolve(localFilePath);
    console.log("Attempting to upload to Cloudinary:", absolutePath);

    // Upload the file on Cloudinary
    const response = await cloudinary.uploader.upload(absolutePath, {
      resource_type: "auto",
    });

    // File has been uploaded successfully
    console.log("File uploaded successfully to Cloudinary:", response.url);

    // Safely remove the local file
    try {
      if (fs.existsSync(absolutePath)) fs.unlinkSync(absolutePath);
    } catch (err) {
      console.error("Error deleting local file after success:", err.message);
    }

    return response;
  } catch (error) {
    console.error("Cloudinary upload failed:", error.message || error);
    
    // Normalize and safely remove the local file if it exists
    try {
      const absolutePath = path.resolve(localFilePath);
      if (localFilePath && fs.existsSync(absolutePath)) fs.unlinkSync(absolutePath);
    } catch (err) {
      console.error("Error deleting local file after failure:", err.message);
    }
    
    return null;
  }
};

export { uploadOnCloudinary };
