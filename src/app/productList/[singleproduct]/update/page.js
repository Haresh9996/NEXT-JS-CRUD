"use client"
import { Button, Input } from "@nextui-org/react";
import { useState, useEffect } from "react";

export default function Update({ params }) {

    const [value, setValue] = useState({ name: '', model: '', price: '', description: '' });

    const handleInput = (e) => {
        const { name, value } = e.target;
        setValue((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    useEffect(() => {
        setDetails()
    }, [])

    const setDetails = async () => {
        const id = params.singleproduct
        // console.log(id)
        // const data = await fetch(`http://localhost:3000/productList/${id}`)
        // const result = await data.json()
        // console.log(result)
        // if (result) {
        //     setValue({
        //         name: result.result.name,
        //         model: result.result.model,
        //         price: result.result.price,
        //         description: result.result.description
        //     })
        // } else {
        //     throw new Error("facing error")
        // }
    }
    const handleSubmit = async (e) => {
        e.preventDefault();

    };


    return (
        <>
            <div className="min-h-[100dvh] flex flex-col gap-12 items-center justify-center">
                <h2 className="text-4xl text-indigo-800">Add Products</h2>
                <form className="grid gap-4">
                    <Input type="text" variant="bordered" label="Product Name" color="secondary" value={value.name} name="name" onChange={handleInput} />
                    <Input type="text" variant="bordered" label="Product Model" color="secondary" value={value.model} name="model" onChange={handleInput} />
                    <Input type="text" variant="bordered" label="Product Price" color="secondary" value={value.price} name="price" onChange={handleInput} />
                    <Input type="text" variant="bordered" label="Product Description" color="secondary" value={value.description} name="description" onChange={handleInput} />


                    <Button type="button" color="secondary" variant="bordered" onClick={handleSubmit}>Submit</Button>
                </form>
            </div>
        </>
    );
}
