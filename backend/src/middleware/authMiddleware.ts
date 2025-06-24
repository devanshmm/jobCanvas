import express, { Request,  Response } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'; 
import { any, string } from 'zod';


dotenv.config();
interface JwtPayload{
    id: string
}

const secretKey = process.env.SECRET_KEY||'default_secret_key'

const app = express();
app.use(express.json());
const Authentication = (req:any, res: any, next:any)=>{
    const token = req.headers.authorization?.split(' ')[1];
//     console.log("🔐 Token middleware hit");
//  console.log("🔐 Token raw:", req.headers.authorization);

    if(!token){
    return  res.status(401).send('access denied');
    }else{
        try{
        const decode = jwt.verify(token,secretKey)as JwtPayload;
        (req as any).userId = decode.id;
        next()
    }catch(err){
        res.status(404).send('invalid token')
    }
}
}
export default Authentication;