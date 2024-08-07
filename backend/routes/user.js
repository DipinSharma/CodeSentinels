import express from 'express';
import { signUp,doctorSignUp } from '../controllers/auth.js';

const router = express.Router();

router.post('/signup', signUp);
router.post('/doctorSignUp',doctorSignUp);
export default router;
