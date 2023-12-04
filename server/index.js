import express from 'express'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
import cors from 'cors'
import authRoutes from "./routes/authRoutes.js"
import categoryRoutes from "./routes/categoryRoutes.js" 
import productRoutes from "./routes/productRoutes.js"

dotenv.config()


const app = express()

app.use(cors())
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }));
app.use(express.json())

app.use(express.urlencoded({ extended: false }))

app.use(cookieParser())

const port = 4000 || process.env.PORT

const connectDB = async () => {
    try {
        //ecommerce-store
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true  
        }); 
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

app.use(express.static("public"))

app.use("/api/auth", authRoutes)
app.use("/api/category", categoryRoutes)
app.use("/api/product", productRoutes)

app.listen(port, () => {
    connectDB()
    console.log(`Server running on port ${port}`)
})