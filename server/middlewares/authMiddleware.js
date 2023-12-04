import jwt from "jsonwebtoken"
import userModel from "../models/userModel.js"

export const requireSignIn = async(req,res,next) => {
    try{
        console.log(req.headers.authorization)
        const decode = jwt.verify(req.headers.authorization, process.env.JWT_SECRET)
        console.log(decode)
        req.user = decode
        next()
    } catch(error){
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Invalid token",
            error
        })
    }
}

export const isAdmin = async(req,res,next) => {
    try{
        const user = await userModel.findById(req.user._id)
        console.log(user)
        if(user.role !== 1){
            res.status(401).send({
                success: false,
                message: "You are not authorized to access the resources",
            });
        } else{
            next()
        }
    } catch(error){
        console.log(error)
        res.status(401).send({
            success: false,
            error,
            message: "Error in middleware",
        });
    }
}