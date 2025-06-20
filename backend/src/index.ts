import express, { Request,  Response } from 'express';
import router from './routes/authRoute'
const app = express(); 
const cors = require('cors');
app.use(cors());

app.use(express.json());
 const port = 3000;

 // test route 
 app.get('/', (req:Request, res:Response)=>{
    res.send('Hello from Express + TypeScript!')
 })

 app.use('/api', router);

 app.listen(port, () => {
    console.log(`Server is runningg on http://localhost:${port}`);
  });