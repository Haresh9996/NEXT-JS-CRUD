"use client";

import { useEffect, useState } from "react";
import { Card, Text, Loading, CardHeader, CardBody, Divider } from "@nextui-org/react";

export default function ProductDetails({ params }) {
    const { id } = params;

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchData();
    }, [id]);

    const fetchData = async () => {
        try {
            const response = await fetch("/api/products/" + id);
            const result = await response.json();
            if (result.success) {
                setProduct(result.message);
            } else {
                console.error("Failed to fetch product:", result.message);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
            {loading ? <div>loading</div> :
                <>
                    <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
                        <Card>
                            <CardHeader>
                                <h3 className="text-md">{product.name}</h3>
                            </CardHeader>
                            <Divider />
                            <CardBody>
                                <p>Category: {product.category}</p>
                                <p>Color: {product.color}</p>
                                <p>Price: {product.price}</p>
                                <p>Company: {product.company}</p>
                            </CardBody>
                        </Card>
                    </div>
                </>

            }

        </div>
    );
}
