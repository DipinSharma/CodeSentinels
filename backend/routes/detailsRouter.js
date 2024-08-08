import express from "express";
import { getAllUserDetails, getDetailsOfADoctor } from "../controllers/getDetails.js";

const detailsRouter = express.Router(); // Renamed to detailsRouter for better readability

detailsRouter.get('/userDetails', getAllUserDetails);
detailsRouter.get('/doctorDetails', getDetailsOfADoctor);

export default detailsRouter; // Exporting the router
