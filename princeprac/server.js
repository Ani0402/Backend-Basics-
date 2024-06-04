import  express  from "express";
import { connectDB } from "./db/db.js";
import bodyParser from "body-parser";
import personRouter from "./routes/personRoutes.js";
import menuRouter from "./routes/menuRoutes.js";
import passport from "./auth.js "
import {jwtAuthMiddleware} from "./jwt.js"
const app = express();
app.use(bodyParser.json())
connectDB()

const logRequest = (req, res,next) => {
    console.log(`[${new Date().toLocaleString()}] Request made`);
    next()
}

app.use(logRequest)
const auth=passport.authenticate("local",{session:false})
app.get('/',(req, res) => {
    res.send("Hello Home Page") 
})


app.use(passport.initialize());

app.use("/person",personRouter)
app.use("/menu",auth,menuRouter)
app.listen(4000)