// src/components/AddProduct.js

"use client";
import React, { useEffect, useState } from "react";
import { Input, Button, Dropdown, Spacer, Menu, MenuItem } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { Toaster, toast } from "sonner";


export default function UpdateProduct({ id }) {
    console.log("id is", id)
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [company, setCompany] = useState("");
    const [color, setColor] = useState("");
    const [category, setCategory] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter()

    useEffect(() => {
        fetchData()
    }, [])
    const fetchData = async () => {
        try {
            const response = await fetch(`/api/products/${id}`);
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            const result = await response.json();
            console.log("data from update function", result);
            setName(result.message.name || "");
            setPrice(result.message.price || "");
            setCompany(result.message.company || "");
            setColor(result.message.color || "");
            setCategory(result.message.category || "");
        } catch (error) {
            console.error("Error fetching product data:", error);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);

        const updatedProduct = {
            name,
            price,
            company,
            color,
            category,
        };

        try {
            const response = await fetch(`/api/products/update/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedProduct),
            });
            const result = await response.json();

            if (result.success) {
                // alert("");
                router.push("/")
                toast.info("Product updated successfully!")
            } else {
                // alert("", );
                toast.error("Failed to update product:", {
                    description: result.message
                })
            }
        } catch (error) {
            console.error("Error updating product:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
            <form onSubmit={handleSubmit}>
                <Input clearable bordered fullWidth color="primary" size="lg" placeholder="Product Name" value={name} onChange={(e) => setName(e.target.value)} required />

                <Spacer y={1} />

                <Input clearable bordered fullWidth color="primary" size="lg" placeholder="Price" type="number" value={price} onChange={(e) => setPrice(e.target.value)} required />

                <Spacer y={1} />

                <Input clearable bordered fullWidth color="primary" size="lg" placeholder="Company" value={company} onChange={(e) => setCompany(e.target.value)} required />

                <Spacer y={1} />

                <Input clearable bordered fullWidth color="primary" size="lg" placeholder="Color" value={color} onChange={(e) => setColor(e.target.value)} required />

                <Spacer y={1} />

                <Input clearable bordered fullWidth color="primary" size="lg" placeholder="Category" value={category} onChange={(e) => setCategory(e.target.value)} required />

                <Spacer y={1} />

                <Spacer y={1} />
                <Button type="submit" color="primary" size="lg" loading={loading}>
                    Update Product
                </Button>
            </form>
            <Toaster position="top-right" richColors />
        </div>
    );
}
