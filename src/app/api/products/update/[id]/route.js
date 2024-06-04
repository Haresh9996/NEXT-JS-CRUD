import { ConnectionStr } from "@/app/utils/DB";
import { ProductSchema } from "@/app/utils/ProductModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function PUT(request, {params}){
    const id = params.id;
    const payload = await request.json();
    try {
        await mongoose.connect(ConnectionStr)
        const result = await ProductSchema.findOneAndUpdate({_id: id}, payload)

        return NextResponse.json({message: result, success: true})
    } catch (error) {
        console.log(error)        
        return NextResponse.json({message: error, success: false})
    }
}