import express from "express";
import { doctorController } from "../controllers/doctorController.js";

const doctorRoutes=express.Router()

doctorRoutes.get('/getAll',doctorController.getAll);
export default doctorRoutes;