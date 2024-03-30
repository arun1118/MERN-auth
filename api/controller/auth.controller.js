import User from "../models/user.models.js";
import bcryptjs from 'bcryptjs'
import { errorHandler } from "../utils/error.js";
import jwt from 'jsonwebtoken'

export const signup = async (req,res,next)=>{
    const {username, email, password} = req.body;
    const hashPassword=bcryptjs.hashSync(password, 8)
    const newUser = new User({username, email, password: hashPassword})
    try{
       await newUser.save()
       console.log("successfully saved a new user")
       res.status(201).json({message: "user created and saved successfully"}) 
    }
    catch(error){
        console.log("error saving a new user")
        next(error)
    }
}

export const signin = async (req,res,next)=>{
    const {username, password} = req.body;
    try{
        const validUser = await User.findOne({username})
        if(!validUser) return next(errorHandler(401,"User not found"))
        const isMatchPassword = bcryptjs.compareSync(password, validUser.password)
        if(!isMatchPassword) return next(errorHandler(404, "Invalid credentials!!"))
        const token = jwt.sign({id: validUser._id}, process.env.JWT_CODE)
        const {password: hashedpassword, ...userData} = validUser._doc
        const expiryDate = new Date(Date.now()+3600000)
        res.cookie('access_token', token, {httpOnly: true, expires: expiryDate}).status(200).json(userData)
    }catch (error){
        next(error)
    }
}