import express from 'express';
import { userLogin , userRegister,userLogout} from '../controllers/authController.js';
const route=express.Router();


route.post('/register', userRegister);
route.post('/login', userLogin);
route.post('/logout', userLogout);


export default route;