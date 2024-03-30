import User from "../models/user.models.js";
import bcryptjs from 'bcryptjs'

export const signup = async (req,res)=>{

    let newUser=undefined
    try{        
        const {username, email, password} = req.body;
        const hashPassword=bcryptjs.hashSync(password, 8)
        newUser = new User({username, email, password: hashPassword})
    }
    catch(error) {
        console.log("error creating user")
        res.status(401).json(error.messaage)
    }

    try{
       await newUser.save()
       res.status(201).json({message: "user created and saved successfully"}) 
    }
    catch(error){
        console.log("error saving a new user")
        res.status(401).json(error.message)
    }
}