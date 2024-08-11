import express from "express";
import { getAllUserDetails, getDetailsOfADoctor } from "../controllers/getDetails.js";
import { getDetails } from "../controllers/getSessionDetailsController.js";

const detailsRouter = express.Router(); // Renamed to detailsRouter for better readability

detailsRouter.get('/userDetails', getAllUserDetails);
detailsRouter.get('/doctorDetails', getDetailsOfADoctor);
detailsRouter.post('/getUserSessions', getDetails.getUserSessions);
detailsRouter.post('/getPatientSessions', getDetails.getPatientDetails);
export default detailsRouter; // Exporting the router
