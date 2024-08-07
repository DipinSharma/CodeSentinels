import express from 'express'
import {mongoDB} from './config/dbConnect.js'
import cors from "cors";
import { config } from 'dotenv';
 
config({path:'./.env'}) 

const app = express()
const port = process.env.PORT

app.use(cors()) 
app.use(express.json())
app.use(express.urlencoded({extended:true}))

mongoDB()
 
//routes



app.use((req,res)=>res.send("invalid URL"))


app.listen(port,()=>{
    console.log(`listening at ${port}`)
})
