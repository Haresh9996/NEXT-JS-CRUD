const { default: mongoose } = require("mongoose");

 const ProductModel = new mongoose.Schema({
    name: String,
    price: String,
    company: String,
    color: String,
    category: String,
 })

 export const ProductSchema = mongoose.models.products || mongoose.model("products", ProductModel)