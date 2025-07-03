import { Request, Response, Router} from "express";
import express from "express";
import { upload } from "../middleware/multer";
import { deflateRaw } from "zlib";
import multer from "multer";

const  krouter = express.Router();
const app = express();
app.use(express.json())
interface multerReq extends  Request {
 file ?:Express.Multer.File;
}


krouter.post('/upload',upload.single('resume'), (req:multerReq, res:Response): void => {
  
    if(!req.file){
        res.status(400).json({msg:'pls upload the file '});
        console.log('API hit')
        return;
    }
    console.log("Uploaded file:", req.file);
    res.json({
        msg:"file uploaded succesfully ",
        file: req.file,
    });
});
export default krouter;

