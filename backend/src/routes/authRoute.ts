import express,{Request, Response} from 'express'
import { z} from 'zod';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'; 
import Authentication from '../middleware/authMiddleware';
dotenv.config();

const prisma = new PrismaClient();
export { prisma };
const app = express();
app.use(express.json());
const router = express.Router();

router.get('/test', Authentication,(req:Request, res:Response)=>{
        res.send('this is auth route ').json({msg:"hiiiiiii"});
})

const User = z.object({
    email: z.string().email(),
    password: z.string().min(6),
    name: z.string()
})
router.post('/signUp',async(req:Request, res:Response)=>{
    const result = User.safeParse(req.body);
    console.log("Received body:", req.body)
    if(!result.success){
        console.log("Validation error:", result.error.format());
        res.status(404).json()
    }else{
        try {
            const user = await prisma.user.create({
                data: {
                    email: result.data.email,
                    password: result.data.password,
                    name: result.data.name
                },
            })
            const token = jwt.sign(
                {id: user.id},
                process.env.SECRET_KEY || 'default_secret_key',
                
            )

            res.status(200).json({
                msg: 'user created successfully',
                user,
                token
            })
        } catch (error) {
            res.json({msg: 'somethings up with the db or the route',Error});
        }
    }
})
 const SigninSchema = z.object({
    email: z.string().email(),
    password: z.string()
 })
router.post('/signin',async (req:any, res:any)=>{
    const result =  SigninSchema.safeParse({
        email: req.body.email,
        password: req.body.password
    })
    if(!result.success){
        res.status(400).json({msg: 'something wrong with inputs '})
    }else{
        try {
            const user  = await prisma.user.findUnique({
                where:{ email: result.data.email}
                
            })

            if(!user || user.password !=result.data.password){
                return res.status(401).json({ error: 'Invalid email or password' });
            }

            const token = jwt.sign(
                {id: user.id},
                process.env.SECRET_KEY || 'default_secret_key',
                
            )
            res.json({
                msg:'login successfully ',
                token
            })
        } catch (error) {
            res.status(500).json({ msg: 'Internal server error', error });
        }
    }
})
export default router;



