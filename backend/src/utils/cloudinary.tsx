import { v2 as cloudinary } from "cloudinary";
import { configDotenv } from "dotenv";
import fs from 'fs'
configDotenv()
cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET
  });

export const cloudUpload = async(localFilePath: string)=>{
try {
    if(!localFilePath) return console.log("no file path ");
// upload 
     const response = await cloudinary.uploader.upload(localFilePath,{
        resource_type: "auto"
    })
    console.log('file is uploaded', response.url);
     return response.url

} catch (error) {
    fs.unlinkSync(localFilePath);
    return null;
}
}