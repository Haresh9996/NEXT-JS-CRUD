import { NextResponse } from "next/server";
import { connectionStr } from "@/utils/db";
import mongoose from "mongoose";
import { Product } from "@/utils/model/product";

export async function GET(request) {

    await mongoose.connect(connectionStr)
    const data = await Product.find()
    console.log(data)

    return NextResponse.json({ result: data })
}

export async function POST(request) {
    let payload = await request.json()
    await mongoose.connect(connectionStr)
    let product = new Product(payload)
    const result = await product.save()

    return NextResponse.json({result: result})
}

