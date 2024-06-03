// src/components/ProductTable.js

"use client";
import React, { useEffect, useState, useCallback } from "react";
import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    User,
    Chip,
    Tooltip,
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
} from "@nextui-org/react";
import { NEXT_BASE_PUBLIC_URL } from "@/app/utils/DB";
import { FaEye, FaEdit } from "react-icons/fa";
import { FaDeleteLeft } from "react-icons/fa6";
import Link from "next/link";




const statusColorMap = {
    available: "success",
    unavailable: "danger",
    limited: "warning",
};

export default function ProductTable() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    // const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    // const [deleteProductId, setDeleteProductId] = useState(null);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await fetch(`http://localhost:3000/api/products`);
            const result = await response.json();
            if (result.success) {
                setProducts(result.message);
            } else {
                console.error("Failed to fetch products:", result.message);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false);
        }
    };

    // const handleDeleteClick = (id) => {
    //     setDeleteProductId(id);
    //     setIsDeleteModalOpen(true);
    // };

    // const DeleteOne = async () => {
    //     console.log(deleteProductId)
        // try {
            // const response = await fetch(`http://localhost:3000/api/products/${deleteProductId}`, {
            //     method: "DELETE"
            // });
            // const result = await response.json();
            // if (response.ok) {
                // setProducts((prevProducts) => prevProducts.filter((product) => product._id !== deleteProductId));
                // setIsDeleteModalOpen(false);
            // } else {
                // console.error("Failed to delete product:", result.message);
            // }
        // } catch (error) {
        //     console.error("Error deleting product:", error);
        // }
    // };
    const DeleteOne = async (id) => {
        // console.log(deleteProductId)
        try {
            const response = await fetch(`http://localhost:3000/api/products/${id}`, {
                method: "DELETE"
            });
            if (response.ok) {
                setProducts((prevProducts) => prevProducts.filter((product) => product._id !== deleteProductId));
                // setIsDeleteModalOpen(false);
                const result = await response.json();
            } else {
                console.error("Failed to delete product:", result.message);
            }
        } catch (error) {
            console.error("Error deleting product:", error);
        }
    };

    const renderCell = useCallback((product, columnKey) => {
        const cellValue = product[columnKey];

        switch (columnKey) {
            case "name":
                return <User name={cellValue}>{product.description}</User>;
            case "price":
                return `$${cellValue}`;
            case "company":
                return cellValue;
            case "color":
                return <Chip>{cellValue}</Chip>;
            case "category":
                return cellValue;
            case "status":
                return (
                    <Chip
                        className="capitalize"
                        color={statusColorMap[product.status]}
                        size="sm"
                        variant="flat"
                    >
                        {cellValue}
                    </Chip>
                );
            case "actions":
                return (
                    <div className="relative flex items-center gap-2">
                        <Tooltip content="Details">
                            <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                                <Button isIconOnly color="primary" variant="light" as={Link} href={"/" + product._id}>
                                    <FaEye />
                                </Button>
                            </span>
                        </Tooltip>
                        <Tooltip content="Edit product">
                            <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                                <Button isIconOnly color="success" variant="light" as={Link} href={"/update/" + product._id}>
                                    <FaEdit />
                                </Button>
                            </span>
                        </Tooltip>
                        <Tooltip color="danger" content="Delete product">
                            <span className="text-lg text-danger cursor-pointer active:opacity-50">
                                <Button isIconOnly color="danger" variant="light" onClick={() => DeleteOne(product._id)}>
                                    <FaDeleteLeft />
                                </Button>
                            </span>
                        </Tooltip>
                    </div>
                );
            default:
                return cellValue;
        }
    }, []);

    return (
        <div style={{ minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: "#f0f2f5" }}>
            <Table aria-label="Product table with custom cells" css={{ maxWidth: "800px", width: "100%", padding: "20px", borderRadius: "10px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}>
                <TableHeader>
                    <TableColumn>Name</TableColumn>
                    <TableColumn>Price</TableColumn>
                    <TableColumn>Company</TableColumn>
                    <TableColumn>Color</TableColumn>
                    <TableColumn>Category</TableColumn>
                    <TableColumn>Actions</TableColumn>
                </TableHeader>
                <TableBody>
                    {products.map((product) => (
                        <TableRow key={product._id}>
                            {["name", "price", "company", "color", "category", "actions"].map(
                                (columnKey) => (
                                    <TableCell key={columnKey}>{renderCell(product, columnKey)}</TableCell>
                                )
                            )}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            {/* <Modal closeButton aria-labelledby="modal-title" open={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(true)} >
                <ModalHeader className="flex flex-col gap-1">
                    Confirm Deletion
                </ModalHeader>
                <ModalBody>
                    <p>Are you sure you want to delete this product?</p>
                </ModalBody>
                <ModalFooter>
                    <Button auto flat color="error" onClick={DeleteOne}>
                        Delete
                    </Button>
                    <Button auto onClick={() => setIsDeleteModalOpen(false)}>
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal> */}
        </div>
    );
}
