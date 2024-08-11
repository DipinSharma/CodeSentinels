import express from "express";

import { bookedConsultation } from "../controllers/bookedController.js";

const bookedRouter=express.Router();

bookedRouter.post("/bookingRoute",bookedConsultation);

export default bookedRouter;