"use client"
import { Button, Input } from "@nextui-org/react";
import { useState } from "react";

export default function addproduct() {
    const [value, setValue] = useState({ name: '', model: '', price: '', description: '' });

    const handleInput = (e) => {
        const { name, value } = e.target;
        setValue((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await fetch("http://localhost:3000/api/products", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(value)
        });
        
        if (!response.ok) {
            throw new Error("Failed to add product");
        }
        
        const result = await response.json();
        if (result.success) {
            alert("New product added");
        }
        setValue(
            {
                name: '', model: '', price: '', description: ''
            }
        )
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
