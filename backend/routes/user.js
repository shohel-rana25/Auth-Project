import express from 'express';
import { getAllUsers, userProfile } from "../controllers/ProfileController.js";
import protect from '../middleware/protectMiddleware.js';

const userRouter = express.Router();

userRouter.get("/profile", protect, userProfile);
userRouter.get("/all", getAllUsers);
export default userRouter;
