import express from 'express';
import contactRoutes from './router/contactRoutes.js';
import userRoutes from './router/userRoutes.js'
import errorHandler from './middleware/errorHandler.js';
import connectDB from './db.js';
import dotenv from "dotenv"

dotenv.config()
const app = express();


connectDB();

const PORT=process.env.PORT || 4000;

app.use(express.json())

app.get('/',(req, res) => {
    res.send("Hello WORLD")
})

app.use("/api/contacts",contactRoutes);
app.use("/api/users",userRoutes);


app.use(errorHandler)

app.listen(PORT, ()=>{
    console.log('listening on port'+PORT)
})