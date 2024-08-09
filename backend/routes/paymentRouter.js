import express from 'express';
import { paymentController } from '../controllers/paymentController.js';

const paymentRoutes=express.Router();

paymentRoutes.post('/processPayment',paymentController.paymentProcess);

export default paymentRoutes;