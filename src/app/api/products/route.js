import { NextResponse } from "next/server";
import { connectionStr } from "@/utils/db";
import mongoose from "mongoose";
import { Product } from "@/utils/model/product";

export async function GET(request) {
    try {
        await mongoose.connect(connectionStr)
        const data = await Product.find()
        console.log(data)
        return NextResponse.json({ message: data, success: true }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ message: error, success: false }, { status: 400, statusText: "request not resolve" })
    }
}

export async function POST(request) {
    try {
        let payload = await request.json()
        await mongoose.connect(connectionStr)
        let product = new Product(payload)
        const result = await product.save()
    
        return NextResponse.json({ message: result, success: true }, {status: 200})
    } catch (error) {
        return NextResponse.json({ message: error, success: false },  {status: 400})
    }
}

