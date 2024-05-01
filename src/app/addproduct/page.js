"use client"
import { Button, Input, Link } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { BASE_API_URL } from "@/utils/db";

export default function Addproduct() {
    let router = useRouter()
    let [name, setName] = useState("")
    let [model, setModel] = useState("")
    let [price, setPrice] = useState("")
    let [description, setDescription] = useState("")

    console.log(BASE_API_URL)

    const handleSubmit = async (e) => {

        e.preventDefault();
        try {
            // let response = await fetch(`${BASE_API_URL}/api/products`, {
            let response = await fetch(`http://localhost:3000/api/products`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ name, model, price, description })
            });
            response = await response.json();
            console.log(response)
            alert("product added sucessfully")
            router.push("/productList")

        } catch (error) {
            console.error("Error:", error.message);
            alert("Failed to add product");
        }
    };


    return (
        <>
            <div className="min-h-[100dvh] flex flex-col gap-12 items-center justify-center">
                <h2 className="text-4xl text-indigo-800">Add Products</h2>
                <form className="grid gap-4">
                    <Input type="text" variant="bordered" label="Product Name" color="secondary" name="name" value={name} onChange={(e) => setName(e.target.value)} />
                    <Input type="text" variant="bordered" label="Product Model" color="secondary" name="model" value={model} onChange={(e) => setModel(e.target.value)} />
                    <Input type="text" variant="bordered" label="Product Price" color="secondary" name="price" value={price} onChange={(e) => setPrice(e.target.value)} />
                    <Input type="text" variant="bordered" label="Product Description" color="secondary" name="description" value={description} onChange={(e) => setDescription(e.target.value)} />

                    <Button type="button" color="secondary" variant="bordered" onClick={handleSubmit}>Submit</Button>
                </form>
                <Button className="self-end" as={Link} href="/productList" showAnchorIcon>Go to Product List from here</Button>
            </div>
        </>
    );
}
