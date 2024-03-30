import express from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config()

import authRoutes from './routes/auth.route.js'

mongoose
.connect(process.env.MONGODB_URL)
.then(()=>{
    console.log("connected to DB successfully")
})
.catch((err)=>{
    console.log("Error connecting to MongoDB ", err)
})

const app=express()

app.use(express.json())
app.use("/api/auth",authRoutes);

app.listen(3000,()=>{
    console.log("server running on port 3000")
})