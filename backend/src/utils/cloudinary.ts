import { v2 as cloudinary } from "cloudinary";
import dotenv from 'dotenv'
import fs from 'fs'

dotenv.config()
cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET
  });

export const cloudUpload = async(localFilePath: string):Promise<string|null>=>{
try {
    if(!localFilePath) console.log("no file path ");
// upload 
     const response = await cloudinary.uploader.upload(localFilePath,{
        resource_type: "raw",
    })
    fs.unlinkSync(localFilePath);
    console.log('file is uploaded', response.secure_url);
     return response.secure_url;
   

} catch (error) {
    fs.unlinkSync(localFilePath);
    console.log('deleated the file ')
    return null;
    
}
}
