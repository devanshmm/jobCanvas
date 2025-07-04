import { Request, response, Response, Router} from "express";
import express from "express";
import { upload } from "../middleware/multer";
import { cloudUpload } from "../utils/cloudinary";
import { promises } from "dns";

import { Prisma, PrismaClient } from "@prisma/client";
import { string } from "zod";
import Authentication from "../middleware/authMiddleware";
const prisma = new PrismaClient();
const  krouter = express.Router();
const app = express();
app.use(express.json())
interface multerReq extends  Request {
 file ?:Express.Multer.File;
}


krouter.post ('/upload',upload.single('resume'), Authentication, async(req:multerReq, res:Response): Promise<void> => {
  
    if(!req.file){
        res.status(400).json({msg:'pls upload the file '});
        
        return;
    }

    console.log("Uploaded file:", req.file);
    const localFilePath = req.file.path
    const result = await cloudUpload(localFilePath)
    const userId = (req as any).userId
    
    if(!result){
        res.json({msg:"upload failed" })
    }else{
        const ResumeUpload = await prisma.resume.create({
            data:{
                fileName: 'resume ',
                fileurl: result || '',
                user: {
                    connect: {id:userId}
                }
            }
            
        })
    }
    res.json({
        msg:"file uploaded succesfully ",
        file: req.file,
    });

});
export default krouter;