import express from 'express'
import {mongoDB} from './config/dbConnect.js'
import cors from "cors";
import { config } from 'dotenv';
import userRoutes from './routes/userRouter.js';
import consultationRoutes from './routes/consultationRouter.js';

config({path:'./.env'}) 

const app = express()
const port = process.env.PORT

app.use(cors()) 
app.use(express.json()) 
app.use(express.urlencoded({extended:true}))

mongoDB()
 
//routes

app.use("/user", userRoutes);
app.use('/consultation',consultationRoutes)


app.use((req,res)=>res.send("invalid URL"))


app.listen(port,()=>{
    console.log(`listening at ${port}`)
})
