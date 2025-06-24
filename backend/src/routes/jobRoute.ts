import express,{ Request, Response } from "express";
const jrouter = express.Router();
import { z} from 'zod';
import { PrismaClient } from "@prisma/client"; // Standard import
import Authentication from "../middleware/authMiddleware";
import { error } from "console";
const prisma = new PrismaClient();

const app = express();
app.use(express.json());
export interface AuthRequest extends Request {
    userId?: string;
  }
//////test///////
jrouter.get('/test2' ,Authentication,(req:any, res:Response)=>{
    res.json({msg:'this is job ka route'})
   
})
///////test////////

const job = z.object({
    jobTitle: z.string(),
    company :z.string(),
    jobURL: z.string().url(),
    status: z.string(),
    salary : z.string(),
    location: z.string(),
    description : z.string(),

})
jrouter.post('/jobs',Authentication, async (req:Request, res: Response)=>{
    const result = job.safeParse(req.body);
    const userId = (req as any ).userId;
    if(!result.success){
        res.status(404).json({msg:'zod error / velidation error'})
    }else{
        try{
            const jobRecord = await prisma.job.create({
                data: {
                    jobTitle: result.data.jobTitle,
                    company: result.data.company,
                    jobURL: result.data.jobURL,
                    status: result.data.status,
                    salary: result.data.salary,
                    location: result.data.location,
                    description: result.data.description,
                    user:{
                        connect:{id: userId}
                    } 
                },
            });
            res.status(201).json(jobRecord);
        }catch(err){
            res.status(404).json({msg:'bhai kuch bohoot gadbad h '})
        }
    }

});
//get route not working@@@!!!!!
jrouter.get('/jobs',Authentication,async(req:Request, res: Response)=>{
    const userId = (req as any).userId;
   
try {
    const jobs = await prisma.job.findMany({
        where: {userId:userId}
    })
    res.json(jobs)
} catch (error) {
    res.status(500).json({ error: 'Server error' })
}
})

//post
const updatedJob = z.object({
    jobTitle: z.string().optional(),
    company :z.string().optional(),
    jobURL: z.string().url().optional(),
    status: z.string().optional(),
    salary : z.string().optional(),
    location: z.string().optional(),
    description : z.string().optional(),
})
jrouter.put('/jobs/:id', Authentication, async (req: any, res: any) => {
  const jobId = req.params.id;
  const userId = (req as any).userId;
  const parsed = updatedJob.safeParse(req.body);

  if (!parsed.success) {
    return res.status(400).json({ msg: 'Validation error', errors: parsed.error.errors });
  }

  try {
    
    const job = await prisma.job.findUnique({
      where: { id: jobId },
    });

    if (!job || job.userId !== userId) {
      return res.status(404).json({ msg: 'Job not found or unauthorized' });
    }

    const updated = await prisma.job.update({
      where: { id: jobId },
      data: parsed.data,
    });

    res.status(200).json({
      msg: 'Successfully updated',
      job: updated,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      msg: 'Server error during update',
    });
  }
});

export default jrouter;

