import express from 'express';
import { signUp,doctorSignUp,login,doctorLogin} from '../controllers/auth.js';

const userRoutes = express.Router();

userRoutes.post('/userSignUp', signUp);
userRoutes.post('/doctorSignUp',doctorSignUp);
userRoutes.post("/userLogin",login)
userRoutes.post("/doctorLogin",doctorLogin)
export default userRoutes;
