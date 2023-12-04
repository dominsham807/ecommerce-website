import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
    {
        products: [
            {
                type: mongoose.ObjectId,
                ref: "Products"
            }
        ],
        total: {
            type: Number,
            required: true
        },
        quantity: {
            type: Number,
            required: true
        },
        buyer: {
            type: mongoose.ObjectId,
            ref: "Users"
        },
        status: {
            type: String,
            default: "Not Processed",
            enum: ["Not Processed", "Processing", "Shipped", "Delievered", "Cancel"],
        }
    },
    { timestamps: true }
)

export default mongoose.model("Order", orderSchema)