

let fetchData = async (id) => {};

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
