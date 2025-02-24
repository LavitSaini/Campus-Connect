import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser';
dotenv.config();

import { connectDB } from './config/db.js';
import eventRouter from './routes/event.route.js';
import userRouter from './routes/user.route.js';
import subscribeRouter from './routes/subscribe.route.js';

const app = express();
app.use(express.json({
    limit : "5MB"
}));
app.use(cookieParser());

const PORT = process.env.PORT || 3000;

app.use('/api/events', eventRouter);
app.use('/api/auth', userRouter);
app.use('/api/subscribe', subscribeRouter);

app.listen(PORT, () => {
    console.log(`Server started successfully on PORT : ${PORT}`);
    connectDB();
})