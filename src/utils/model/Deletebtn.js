"use client"

import { Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";

export default function Deletebtn({_id}) {
    let route = useRouter()
    // console.log(props)
    const deleteData = async () => {
        let response = await fetch(`http://localhost:3000/productList/${_id}`,{
            method: "delete"
        })
        let finalData = response.json();
        if(finalData.success){
            alert("Product Deleted")
            route.push('/productList')
        }

    }


    return (
        <Button color="danger" variant="bordered" onClick={deleteData} > Delete </Button>
    )
};
