import express, { Request,  Response } from 'express';
const app = express();

app.use(express.json());
 const port = 3000;

 app.get('/', (req:Request, res:Response)=>{
    res.send('Hello from Express + TypeScript!')
 })

 app.listen(port, () => {
    console.log(`Server is runningg on http://localhost:${port}`);
  });


