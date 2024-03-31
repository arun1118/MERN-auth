import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import dotenv from 'dotenv'
dotenv.config()

import authRoutes from './routes/auth.route.js'
import userRoutes from './routes/user.route.js'

mongoose
.connect(process.env.MONGODB_URL)
.then(()=>{
    console.log("connected to DB successfully")
})
.catch((err)=>{
    console.log("Error connecting to MongoDB ", err)
})

const app=express()

// app.use are run sequentially, so when we do a next() in /api/auth it then goes to the error mimddleware
app.use(cookieParser())
app.use(express.json())
app.use("/api/user",userRoutes);
app.use("/api/auth",authRoutes);

// error middleware
app.use((err,req,res,next)=>{
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error"
    res.status(statusCode).json({success: false, statusCode, message})
})



app.listen(3000,()=>{
    console.log("server running on port 3000")
})