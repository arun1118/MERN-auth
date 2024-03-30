import User from "../models/user.models.js";
import bcryptjs from 'bcryptjs'

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