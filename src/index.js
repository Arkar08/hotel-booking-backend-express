import express from 'express';
import dotenv from 'dotenv';
import userRoute from './routes/userRoute.js';
import roomRoute from './routes/roomRoute.js';
import couponRoute from './routes/couponRoute.js';
import bookingRoute from './routes/bookingRoute.js';
import { authMiddleware } from './middleware/authMiddleware.js';

dotenv.config();


const app = express()


app.use(express.json())

app.get("/",(req,res)=>{
    return res.status(200).json("hello world")
})

// routes
app.use('/api/v1/users',userRoute)
app.use('/api/v1/rooms',authMiddleware,roomRoute)
app.use("/api/v1/coupon",authMiddleware,couponRoute)
app.use("/api/v1/booking",authMiddleware,bookingRoute)



export default app;