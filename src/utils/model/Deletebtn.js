"use client"

import { Button } from "@nextui-org/react";
import { BASE_API_URL } from "../db";

export default function Deletebtn(props) {

    // console.log(props)
    const deleteData = async () => {
        let id = props.id;

        try {
            const response = await fetch(`${BASE_API_URL}/api/products/${id}`, {
                method: "DELETE"
            });

            if (response.ok) {
                const data = await response.json();
                if (data.success) {
                    alert("Product Deleted!!!");
                } else {
                    alert("Product deletion failed. Please try again.");
                }
            } else {
                throw new Error(`Failed to delete product. Status: ${response.status}`);
            }

        } catch (error) {
            alert("Product deletion failed. Please try again.");
            console.error("Error deleting product:", error);
        }

    }


    return <Button color="danger" variant="bordered" onClick={deleteData} > Delete </Button>
};
