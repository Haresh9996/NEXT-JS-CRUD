"use client"
import { apiUrl } from "@/utils/api";
import { Button, Input, Link } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
// import { BASE_API_URL } from "@/utils/db";

export default function Update({ params }) {
    let productId = params.updateid
    console.log(productId)
    let router = useRouter()
    let [name, setName] = useState("")
    let [model, setModel] = useState("")
    let [price, setPrice] = useState("")
    let [description, setDescription] = useState("")

    useEffect(() => {
        handleInputs()

    }, [])

    const handleInputs = async () => {

        let result = await fetch(`${apiUrl}/api/products/${productId}`)
        // let result = await fetch(`http://localhost:3000/api/products/${productId}`)
        result = await result.json()
        let { description, model, name, price } = result.message

        if (result.success) {
            setName(name)
            setModel(model)
            setPrice(price)
            setDescription(description)
        } else {
            alert("Can't Update Data!!!")
        }

    }

    const handleSubmit = async () => {
        try {
            let result = await fetch(`${apiUrl}/api/products/${productId}`, {
            // let result = await fetch(`http://localhost:3000/api/products/${productId}`, {
                method: 'put',
                body: JSON.stringify({ description, model, name, price })
            })
            result = await result.json()
            console.log(result)
            alert("Product Updated sucessfully")
            router.push("/productList")

        } catch (error) {
            alert("Data doesn't Upadate due to ", error)
            console.log(error)
        }
    }

    return (
        <>
            <div className="min-h-[100dvh] flex flex-col gap-12 items-center justify-center">
                <h2 className="text-4xl text-indigo-800">Update Products</h2>
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
    )
};
