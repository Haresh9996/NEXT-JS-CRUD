
import Head from "next/head"
import ProductTable from "./_Components/ProductTable"
import AddProduct from "./_Components/AddProducts"
export default function page() {

  return (
    <>
      <div>
        <Head>
          <title>Product List</title>
          <meta name="description" content="Product List" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main>
          <ProductTable />
        </main>
      </div>
    </>
  )
};
