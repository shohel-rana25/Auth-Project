import express from 'express'
const app=express();
import dotenv from 'dotenv';
dotenv.config();
import cookieParser from 'cookie-parser';
import route from './routes/authRoute.js';
import mongoose from 'mongoose';
import cors from 'cors';
import userRouter from './routes/user.js';
 

// Middleware
app.use(cors({
  origin: 'http://localhost:5173', 
  credentials: true
})); 

app.use(express.json());
app.use(cookieParser());

app.use("/user", route);
app.use("/user", userRouter);

const PORT=process.env.PORT || 2512


mongoose.connect(process.env.DB_URL)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(process.env.PORT, () =>
      console.log(`Server running on port ${process.env.PORT}`)
    );
  })
  .catch((err) => console.log(err));
