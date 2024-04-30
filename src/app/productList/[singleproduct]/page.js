

let fetchData = async (id) => {
    // let response = await fetch(`http://localhost:3000/api/products/${id}`);
    // let result = await response.json();
    // return result
};

export default function Getsingleproduct({ params }) {
    let productId = params.singleproduct
    let singlePro = fetchData(productId)
    console.log(singlePro)
    return (
        <>

        <>hello world</>
        <h4>{singlePro.name}</h4>
        </>
    )
};
