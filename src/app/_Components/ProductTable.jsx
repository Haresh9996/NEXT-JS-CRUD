"use client"
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
    useDisclosure,
    ModalContent,
} from "@nextui-org/react";
import { FaEye, FaEdit } from "react-icons/fa";
import { FaDeleteLeft } from "react-icons/fa6";
import Link from "next/link";
import { NEXT_BASE_PUBLIC_URL } from "../utils/DB";
import { Toaster, toast } from "sonner";

const statusColorMap = {
    available: "success",
    unavailable: "danger",
    limited: "warning",
};

export default function ProductTable() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
    const [selectedProduct, setSelectedProduct] = useState(null);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await fetch("/api/products");
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

    const deleteOne = async (id) => {
        try {
            const response = await fetch("/api/products/" + id, {
                method: "DELETE"
            });
            const result = await response.json();
            if (result.success) {
                fetchData();
                // alert("Product Deleted");
                toast.error('Product Deleted')
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleDelete = (product) => {
        setSelectedProduct(product);
        onOpen();
    };

    const confirmDelete = () => {
        if (selectedProduct) {
            deleteOne(selectedProduct._id);
            onClose();
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
                                <Button isIconOnly color="danger" variant="light" onClick={() => handleDelete(product)}>
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

            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Delete Product</ModalHeader>
                            <ModalBody>
                                <p>Are you sure you want to delete the product <strong>{selectedProduct?.name}</strong>?</p>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
                                    Cancel
                                </Button>
                                <Button color="primary" onPress={confirmDelete}>
                                    Delete
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
            <Toaster position="top-right" richColors />
        </div>
    );
}
