import UpdateProduct from "@/app/_Components/UpdateProduct";

export default function page({params}) {
    const id = params.id
    return (
        <>
            <UpdateProduct id={id} />
        </>
    )
};
