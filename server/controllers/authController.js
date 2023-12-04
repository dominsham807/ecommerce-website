import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken"
import fs from "fs"
import orderModel from "../models/orderModel.js";

export const registerUser = async(req,res) => {
    try{
        console.log(req.files)

        const { name, email, password, phone, address, answer } = req.body
        const photo = req.files[0]

        if (!name) {
            return res.send({ message: "Name Is Required!" });
        }
        if (!email) {
            return res.send({ message: "Email Is Required!" });
        }
        if (!password) {
            return res.send({ message: "Password Is Required!" });
        }
        if (!phone) {
            return res.send({ message: "Phone Number Is Required!" });
        }
        if (!answer) {
            return res.send({ message: "Answer Is Required!" });
        }

        const existingUser = await userModel.findOne({ email })
        if(existingUser) {
            return res.send({
                success: false,
                message: "This email already registered. Please use another one"
            })
        }

        const hashedPassword = await hashPassword(password)

        const user = await new userModel({
            name, email, phone, address, answer,
            password: hashedPassword,
            photo: photo
        }).save()

        res.status(201).send({
            success: true,
            message: "User registered success",
            user 
        })
    } catch(error){
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error in registration",
            error 
        })
    }
}

export const loginUser = async(req,res) => {
    try{
        const { email, password } = req.body

        if(!email || !password) {
            return res.status(404).send({
                success: false,
                message: "Invalid email or password",
            });
        }

        const user = await userModel.findOne({ email })
        if(!user){
            return res.status(404).send({
                success: false,
                message: "Invalid email address",
            });
        }

        const isPasswordMatched = await comparePassword(password, user.password)
        if(!isPasswordMatched){
            return res.send({
                success: false,
                message: "Wrong credentials",
            });
        }

        const token = jwt.sign({ _id: user._id}, process.env.JWT_SECRET, {
            expiresIn: "7d"
        })

        res.status(200).send({
            success: true,
            message: "Login success",
            user:{
                name: user.name,
                email: user.email,
                phone: user.phone,
                address: user.address,
                role: user.role,
                photo: user.photo
            },
            token
        })
    } catch(error){
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error in login",
            error 
        })
    }
}

export const protectedRoute = async(req,res) => {
    res.send("Protected Route")
}

export const protectedAdminRoute = async(req,res) => {
    res.status(200).send({ ok: true })
}

export const updateProfileController = async(req,res) => {
    try{
        const { name, email, password, address, phone } = req.body
        const photo = req.files[0]
        const user = await userModel.findById(req.user._id)

        if(password && password.length < 6){
            return res.json({ error: "Password required and 6 characters long"})
        }

        const hashedPassword = password ? await hashPassword(password) : undefined

        console.log(photo)
        const updatedUser = await userModel.findByIdAndUpdate(req.user._id, 
            {
                name: name || user.name,
                email: email || user.email,
                password: hashedPassword || user.password,
                phone: phone || user.phone,
                address: address || user.address,
                photo: photo || user.photo
            },
            { new: true }
        )
    

        res.status(200).send({
            success: true,
            message: "Profile updated successfully",
            updatedUser,
        });
    } catch(error){
        console.log(error);
        res.status(400).send({
            success: false,
            message: "Error while updating profile",
            error,
        });
    }
}

export const getUserOrders = async(req,res) => {
    try{
        const orders = await orderModel.find({ buyer: req.user._id }).populate("products", "-photo").populate("buyer", "name")
        res.status(201).json({
            success: true,
            orders
        })
    } catch(error){
        console.log(error);
        res.status(404).send({
            success: false,
            message: "Error while fetching orders",
            error,
        });
    }
}