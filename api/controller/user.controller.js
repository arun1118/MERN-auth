import User from "../models/user.models.js"
import { errorHandler } from "../utils/error.js"
import bcryptjs from 'bcryptjs'

export const updateUser = async (req,res,next)=>{
    if(req.user.id != req.params.id){
        return next(errorHandler(401,"You can update only your account"))
    }
    try{
       if(req.body.password){
        req.body.password = bcryptjs.hashSync(req.body.password, 8)
       } 

       const updatedUser = await User.findByIdAndUpdate(req.params.id,{
        $set:{
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        }
       },{new: true})
       
       const {password, ...userData} = updatedUser._doc
       res.status(201).json(userData)
    }
    catch(error){
        next(error)
    }
}

export const deleteUser = async(req,res)=>{
    if(req.user.id != req.params.id){
        return next(errorHandler(401,"You can delete only your account"))
    }
    try{
        await User.findByIdAndDelete(req.params.id)
        res.status(201).json("User deleted successfully")
    }
    catch(error){
        next(error)
    }
}