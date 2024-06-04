// src/components/AddProduct.js

"use client";
import React, { useState } from "react";
import { Input, Button, Spacer } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { Toaster, toast } from "sonner";

const statusOptions = ["available", "unavailable", "limited"];

export default function AddProduct() {
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [company, setCompany] = useState("");
    const [color, setColor] = useState("");
    const [category, setCategory] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);

        const newProduct = {
            name,
            price,
            company,
            color,
            category,
        };

        try {
            const response = await fetch(`/api/products`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newProduct),
            });
            const result = await response.json();

            if (result.success) {
                // alert("Product added successfully!");
                toast.success("Product added successfully!");
                // Clear form
                setName("");
                setPrice("");
                setCompany("");
                setColor("");
                setCategory("");
            } else {
                // alert("Failed to add product:", result.message);
                toast.error("Failed to add product:", {
                    description: result.message
                });

            }
        } catch (error) {
            console.error("Error adding product:", error);
        } finally {
            setLoading(false);
            router.push("/")
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
                    Add Product
                </Button>
            </form>
            <Toaster position="top-right" richColors />
        </div>
    );
}
