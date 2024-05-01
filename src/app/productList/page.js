import Deletebtn from "@/utils/model/Deletebtn";
import { Link, Button, Kbd } from "@nextui-org/react";
// import { BASE_API_URL } from "@/utils/db";
import { apiUrl } from "@/utils/api";

let fetchData = async () => {
    try {
        let response = await fetch(apiUrl+"/api/products", { cache: 'no-store' });
        // let response = await fetch("http://localhost:3000/api/products", { cache: 'no-store' });

        if (!response.ok) {
            throw new Error("Failed to fetch products");
        }
        let result = await response.json();
        console.log(result)
        return result.message;

    } catch (error) {
        console.error("Error fetching products:", error.message);
        throw error;
    }
};

export default async function productsList() {
    try {
        let finalData = await fetchData();
        console.log(finalData);
        return (
            <>
                <div className="flex flex-col gap-4 min-h-[100dvh]">
                    <h2 className="text-4xl text-center mb-6">Products List</h2>
                    <Button className="self-end" as={Link} href="/addproduct">Add Product from here</Button>
                    <Kbd keys={["command", "shift"]} className="self-end">+ F5 (for hard refresh)</Kbd>
                    <table className="max-w-[800px] m-auto">
                        <thead className="border-1">
                            <tr>
                                <th className="border px-3 py-1">Name</th>
                                <th className="border px-3 py-1">Price</th>
                                <th className="border px-3 py-1">Description</th>
                                <th className="border px-3 py-1">Model</th>
                                <th className="border px-3 py-1">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {finalData.map((item) => (
                                <tr key={item.id}>
                                    <td className="border px-3 py-1">{item.name}</td>
                                    <td className="border px-3 py-1">{item.model}</td>
                                    <td className="border px-3 py-1">{item.price}</td>
                                    <td className="border px-3 py-1">{item.description}</td>
                                    <td className="border px-3 py-1 flex gap-2">
                                        <Button href={`/productList/update/${item._id}`} as={Link} color="secondary" variant="bordered" > Edit </Button>

                                        <Deletebtn id={item._id} />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </>
        );
    } catch (error) {
        return (
            <div>Error fetching products. Please try again later.</div>
        );
    }
}
