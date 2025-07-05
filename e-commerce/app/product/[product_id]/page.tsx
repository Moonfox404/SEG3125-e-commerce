import { MockProducts } from "@/app/mock-data/MockProducts";
import NavBar from "../../components/NavBar";
import ProductDetails from "../../components/ProductDetails";
import ProductImages from "../../components/ProductImages";

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
          <>
            <ProductImages productID={product_id} />
            <ProductDetails productID={product_id} />
          </>
        ) : (
          `Could not find Product with id ${product_id}. Please return to items page`
        )}
      </div>
    </div>
  );
}
