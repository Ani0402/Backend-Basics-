import express from 'express';
import dotenv from "dotenv";
import bodyParser from 'body-parser';
import userRoutes from './routes/userRoutes.js'
import candidateRoutes from './routes/candidateRoutes.js'
import connectDB from './db.js';
import { jwtAuthMiddleware } from './jwt.js';


const app = express();
app.use(bodyParser.json())
dotenv.config();
connectDB()
const PORT=process.env.PORT || 4000;

app.use('/user',userRoutes);
app.use('/candidate',candidateRoutes);

app.listen(PORT,()=>{
   console.log(`listening on port ${PORT}`);
})

