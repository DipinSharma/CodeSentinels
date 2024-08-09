import express from 'express';
import {consultationController} from '../controllers/consultationController.js'

const consultationRoutes = express.Router();

consultationRoutes.post('/saveAndRedirect',consultationController.saveAndRedirect)
consultationRoutes.post('/getAll',consultationController.getAll)

export default consultationRoutes;
