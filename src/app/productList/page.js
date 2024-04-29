
let fetchData = async () => {
    try {
        let response = await fetch("http://localhost:3000/api/products");

        if (!response.ok) {
            throw new Error("Failed to fetch products");
        }
        let result = await response.json();
        return result.result;
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
                    <table border="1">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Price</th>
                                <th>Description</th>
                                <th>Model</th>
                            </tr>
                        </thead>
                        <tbody>
                            {finalData.map((item) => (
                                <tr key={item.id}>
                                    <td>{item.name}</td>
                                    <td>{item.model}</td> 
                                    <td>{item.price}</td>
                                    <td>{item.description}</td>
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
