import User from "../models/user.models.js";
import bcryptjs from 'bcryptjs'

export const signup = async (req,res,next)=>{

    let newUser=undefined
    try{        
        const {username, email, password} = req.body;
        const hashPassword=bcryptjs.hashSync(password, 8)
        newUser = new User({username, email, password: hashPassword})
    }
    catch(error) {
        console.log("error creating user")
        res.status(500).json(error.messaage)
    }

    try{
       await newUser.save()
       res.status(201).json({message: "user created and saved successfully"}) 
    }
    catch(error){
        console.log("error saving a new user")
        next(error)
    }
}