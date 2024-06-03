import { ConnectionStr } from "@/app/utils/DB"
import { ProductSchema } from "@/app/utils/ProductModel"
import mongoose from "mongoose"
import { NextResponse } from "next/server"

export async function GET(request, response){
    const id = response.params.id
    await mongoose.connect(ConnectionStr)
    const payload = await ProductSchema.findById(id)

    return NextResponse.json({message: payload, success: true})
}

export async function DELETE(request, {params}){
    const id = params.id;
    try {
        await mongoose.connect(ConnectionStr)
        const data = await ProductSchema.deleteOne({_id: id})
        return NextResponse.json({message: data, success: true})
    } catch (error) {
        console.log(error)
        return NextResponse.json({message: error, success: false})
    }
}