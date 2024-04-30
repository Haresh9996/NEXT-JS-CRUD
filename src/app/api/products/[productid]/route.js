import { connectionStr } from "@/utils/db"
import { Product } from "@/utils/model/product"
import mongoose from "mongoose"
import { NextResponse } from "next/server"

export async function GET(request, response){
    try {
        let productId = response.params.productid
        await mongoose.connect(connectionStr)
        let filter = {_id:productId}
        const result = await Product.findById(filter)
        return NextResponse.json({message: result, success: true}, {status: 200})    
    } catch (error) {
        return NextResponse.json({message: result, success: false}, {status: 400})    
    }
}

export async function PUT(request, response) {
    try {
        let productId = response.params.productid
        let filter = {_id:productId}
        let payload = await request.json()    
        console.log(productId, payload)
        await mongoose.connect(connectionStr)
        const result = await Product.findOneAndUpdate(filter, payload)
        return NextResponse.json({message: result, success: true}, {status: 200})
    } catch (error) {
        return NextResponse.json({message: result, success: false}, {status: 400})
    }
};

export async function DELETE(request, response){
    try {
        let productId = response.params.productid    
        let filter = {_id:productId}
        await mongoose.connect(connectionStr)
        const result = await Product.deleteOne(filter)
        return NextResponse.json({message: result, success: true}, {status: 200})
    } catch (error) {
        return NextResponse.json({message: result, success: false}, {status: 400})
    }
}