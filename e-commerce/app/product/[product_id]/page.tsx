import { MockProducts } from "@/app/mock-data/MockProducts";
import NavBar from "../../components/NavBar";
import ProductDetails from "../../components/ProductDetails";
import ProductImages from "../../components/ProductImages";
import Footer from "@/app/components/Footer";

export default async function Product({
  params,
}: {
  params: Promise<{ product_id: number }>;
}) {
  const { product_id } = await params;

  const currentProduct = MockProducts[product_id];
  return (
    <div>
      <NavBar />
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
