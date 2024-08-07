import express from 'express'
import {mongoDB} from './config/dbConnect.js'
import cors from "cors";
import { config } from 'dotenv';
// import express from 'express';
import userRoutes from './routes/user.js';
config({path:'./.env'}) 

const app = express()
const port = process.env.PORT

app.use(cors()) 
app.use(express.json())
app.use(express.urlencoded({extended:true}))

mongoDB()
 
//routes


// const app = express();

app.use("/api/v1/auth/", userRoutes);

// app.use("/api/v1/auth/", userRoutes);

app.use((req,res)=>res.send("invalid URL"))


app.listen(port,()=>{
    console.log(`listening at ${port}`)
})
