import { ConnectionStr } from "@/app/utils/DB";
import { ProductSchema } from "@/app/utils/ProductModel";
import mongoose, { mongo } from "mongoose";
import { NextResponse } from "next/server";

export async function GET() {
    try {

        await mongoose.connect(ConnectionStr)
        const data = await ProductSchema.find()

        return NextResponse.json({ message: data, success: true })
    } catch (error) {
        console.log(error)
        return NextResponse.json({ message: error, success: false })
    }
}

export async function POST(request){
    try {
        const payload = await request.json()
        await mongoose.connect(ConnectionStr);
        const data = new ProductSchema(payload)
        const result = await data.save()
        
        return NextResponse.json({message: result, success: true})
    } catch (error) {
        console.log(error)
        return NextResponse.json({message: error, success: false})
    }
}