import { MockProducts } from "@/app/mock-data/MockProducts";
import NavBar from "../../components/NavBar";
import ProductDetails from "../../components/ProductDetails";
import ProductImages from "../../components/ProductImages";
import Footer from "@/app/components/Footer";
import Link from "next/link";

export default async function Product({
  params,
}: {
  params: Promise<{ product_id: number }>;
}) {
  const { product_id } = await params;

  const currentProduct = MockProducts[product_id];
  return (
    <div>
      <NavBar withCategories />
      <div className="mx-5 md:mx-10 my-5 breadcrumbs text-sm">
        <ul>
          <li><Link href="/">Home</Link></li>
          <li><Link href="/#categories">Categories</Link></li>
          <li><Link href={`/browse/${currentProduct.category}`}>{currentProduct.category}</Link></li>
          <li>{currentProduct.name}</li>
        </ul>
      </div>
      <div className="w-full h-screen flex items-center justify-center">
        {currentProduct ? (
          <div className="flex max-sm:flex-col">
            <ProductImages productID={product_id} />
            <ProductDetails productID={product_id} />
          </div>
        ) : (
          `Could not find Product with id ${product_id}. Please return to items page`
        )}
      </div>
      <Footer></Footer>
    </div>
  );
}
