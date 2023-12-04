import categoryModel from "../models/categoryModel.js";
import slugify from "slugify";
import fs from "fs"

export const createCategory = async(req,res) => {
    try{
        const { name } = req.fields
        const { photo } = req.files  

        if (!name) {
            return res.status(401).send({ message: "Name is required" });
        }

        const existingCategory = await categoryModel.findOne({ name })
        if(existingCategory){
            return res.send({
                success: false,
                message: "Category already exists" 
            })
        }

        const category = new categoryModel({
            name,
            slug: slugify(name)
        })
        if(photo){
            category.photo.data = fs.readFileSync(photo.path)
            category.photo.contentType = photo.type
        }
        await category.save()

        res.status(201).send({
            success: true,
            message: "New category created",
            category
        })
    } catch(error){
        console.log(error)
        res.status(500).send({
            success: false,
            error, 
            message: "Error in adding category"
        })
    }
}

export const readCategoryPhoto = async(req,res) => {
    try{
        const category = await categoryModel.findById(req.params.cid).select("photo")
        console.log(category)
        if(category.photo.data){
            res.set("Content-type", category.photo.contentType);
            return res.status(200).send(category.photo.data)
        }
    } catch(error){
        console.log(error)
        res.status(500).json({
            success: false,
            message: "Error in fetching category photo",
            error
        })
    }
}

export const getAllCategories = async(req,res) => {
    try{
        const categories = await categoryModel.find({}).select("-photo")
        res.status(200).send({
            success: true,
            categories
        })
    } catch(error){
        console.log(error)
        res.status(500).send({
            success: false,
            error, 
            message: "Error in fetching categories"
        })
    }
}

export const deleteCategory = async(req,res) => {
    try{
        await categoryModel.findByIdAndDelete(req.params.cid)
        res.status(200).send({
            success: true,
            message: "Category deleted successfully"
        })
    } catch(error){
        console.log(error)
        res.status(500).send({
            success: false,
            error, 
            message: "Error in deleting category"
        })
    }
}