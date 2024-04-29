import mongoose from "mongoose";

const productData = new mongoose.Schema({
    name: String,
    price: String,
    description: String,
    model: String
})

export const Product = mongoose.models.products || mongoose.model("products", productData)