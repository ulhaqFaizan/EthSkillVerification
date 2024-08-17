import dotenv from 'dotenv';
dotenv.config({ path: "../.env" });

import express from 'express';
import connectDB from './db/index.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import userSignup from './routes/signup.js';
import userSignin from './routes/signin.js';
import skillRoutes from './routes/skillRoutes.js';
import proposalRoutes from './routes/proposalRoutes.js'

const app = express();
const port = process.env.PORT || 8000;

connectDB()
    .then(() => {
        app.listen(port, () => {
            console.log(`Server is running on ${port}`);
        });
    });

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(cookieParser());

app.use('/api/user', userSignup);
app.use('/api', userSignin);
app.use('/api/skill', skillRoutes);
app.use('/api/proposal', proposalRoutes);
