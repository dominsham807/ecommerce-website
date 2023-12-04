import braintree from "braintree"
import productModel from "../models/productModel.js"
import fs from "fs"
import slugify from "slugify"
import dotnev from "dotenv"
import categoryModel from "../models/categoryModel.js"
import orderModel from "../models/orderModel.js"

dotnev.config()

var gateway = new braintree.BraintreeGateway({
    environment: braintree.Environment.Sandbox,
    merchantId: process.env.BRAINTREE_MERCHANT_ID,
    publicKey: process.env.BRAINTREE_PUBLIC_KEY,
    privateKey: process.env.BRAINTREE_PRIVATE_KEY,
});

export const createNewProduct = async(req,res) => {
    try {
        console.log(req.fields)
        const { name, description, price, category, quantity, shipping } = req.fields
        const { photo } = req.files 

        switch (true) {
            case !name:
              return res.status(500).send({ error: "Name is required!" });
            case !description:
              return res.status(500).send({ error: "Description is required!" });
            case !price:
              return res.status(500).send({ error: "Price is required!" });
            case !category:
              return res.status(500).send({ error: "Category is required!" });
            case !quantity:
              return res.status(500).send({ error: "Quantity is required!" });
            case photo && photo.size > 1000000:
              return res
                .status(500)
                .send({ error: "Photo is required and should be less then 1mb!" });
        }

        const product = new productModel({ ...req.fields, slug: slugify(name) })
        if(photo){
            product.photo.data = fs.readFileSync(photo.path)
            product.photo.contentType = photo.type 
        }
        await product.save()
        res.status(201).send({
            success: true,
            message: "Product created successfully",
            product
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
          success: false,
          error,
          message: "Error in creating product",
        });
    }
}

export const getProductPhoto = async(req,res) => {
    try{
        const product = await productModel.findById(req.params.pid).select("photo")
        if(product.photo.data){
            res.set("Content-type", product.photo.contentType)
            return res.status(200).send(product.photo.data)
        }
    } catch(error){
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error in fetching product photo",
            error
        })
    }
}

export const fetchAllProducts = async(req,res) => {
    try{
        const products = await productModel.find({}).select("-photo").populate({
            path: "category",
            select: "name"
        }).sort({ createdAt: -1 })
        res.status(200).send({ 
            success: true, 
            totalCount: products.length, 
            products 
        })
    } catch(error){
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error in fetching products",
            error
        })
    }
}

export const fetchSingleProduct = async(req,res) => {
    try{
        const product = await productModel.findOne({ slug: req.params.slug }).select("-photo").populate("category")
        res.status(200).send({
            success: true,
            message: "Fetched single product",
            product
        })
    } catch(error){
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in fetching single product",
            error,
        });
    }
}

export const filterProducts = async(req,res) => {
    try{
        const { checked, radio } = req.body
        let args = {}
        if(checked){
            args.category = checked
        }
        if(radio && !checked){
            args.price = { $gte: radio[0], $lte: radio[1] }
        }
        const products = await productModel.find(args).select("-photo")
        res.status(200).send({
            success: true,
            products
        })
        // console.log(args)
        // const products = await productModel.find(args).select("-photo")
        // res.status(200).send({
        //     success: true,
        //     products
        // })
    } catch(error){
        console.log(error)
        res.status(400).send({
            success: false,
            message: "Error in filtering products",
            error
        })
    }
}

export const productCount = async(req,res) => {
    try{
        const total = await productModel.find({}).estimatedDocumentCount()
        res.status(200).send({
            success: true,
            total  
        })
    } catch(error){
        console.log(error);
        res.status(400).send({
            message: "Error in counting products",
            error,
            success: false,
        });
    }
}

export const productCategory = async(req,res) => {
    try{
        const category = await categoryModel.findOne({ slug: req.params.slug }).select("-photo")
        const products = await productModel.find({ category }).select("-photo").populate({
            path: "category",
            select: "name"
        })
        res.status(200).send({
            success: true,
            category,
            products 
        })
    } catch(error){
        console.log(error)
        res.status(400).send({
            success: false,
            message: "Error while fetching products",
            error
        })
    }
}

export const braintreeToken = async(req,res) => {
    try{
        gateway.clientToken.generate({}, function(err, response){
            if (err) {
                res.status(500).send(err);
            } else {
                res.send(response);
            }
        })
    }catch(error){
        console.log(error)
    }
}

export const braintreePaymentController = async(req,res) => {
    try{
        const { products,total,quantity } = req.body
        // let total = 0
        // cart.map((i) => {
        //     total += i.quantity*i.price
        // })

        const order = new orderModel({
            products, total, quantity,
            buyer: req.user._id,
        })
        console.log(order)
        await order.save()
        res.json({success: true, message: "Payment Success"})
    } catch(error){
        console.log(error)
    }
}