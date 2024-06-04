import express from 'express';
import connectDB from './db.js';
import cors from "cors"
import User from './model/user.model.js';
const app = express();

connectDB()

const PORT=4000;

app.use(cors())
app.use(express.json())

app.get('/',(req, res) => {
    res.send("Hello home")
})

app.post('/add',async(req, res) => {
   const name=req.body.name;
   const email=req.body.email;
   const password=req.body.password;

  await User.create({
    name:name,
    email:email,
    password:password
  }).then(result => res.json(result))
  .catch((err) => res.send(err))
})

app.get('/getUser',async(req, res) => {
   const data=await User.find()
   res.send(data);
})

app.listen(PORT,()=>{
   console.log('listening on port '+PORT);
})