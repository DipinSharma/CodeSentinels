import express from 'express';
import { signUp,doctorSignUp } from '../controllers/auth.js';

const userRoutes = express.Router();

userRoutes.post('/signup', signUp);
userRoutes.post('/doctorSignUp',doctorSignUp);

export default userRoutes;
