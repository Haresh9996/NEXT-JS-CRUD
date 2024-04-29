import { Link } from "@nextui-org/react"
export default function page() {
  return(
    <>
    <div className="flex min-h-[100dvh] items-center justify-center flex-col gap-5">
      <h2>this is home page</h2>
      <Link href="/productList" underline="hover" color="secondary" showAnchorIcon>Go to Product List</Link>
      <Link href="/addproduct" underline="hover" color="secondary" showAnchorIcon>Go to Add Product</Link>
    </div>
    </>
  )
};
