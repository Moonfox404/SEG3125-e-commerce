import ProductGrid from "../components/ProductGrid";
import { MockProducts, Product } from "../mock-data/MockProducts";

export type CategoryName = "all" | "Sofas and Couches" | "Tables and Chairs" | "Office" | "Home Decor";

const BrowseProductsPage = ({
  products,
  category
}: {
  products?: Product[],
  category: CategoryName
}) => {
  return (
    <div className="my-10 grid grid-cols-5">
      {/* filters */}
      <div className="hidden lg:block col col-span-1">

      </div>

      {/* items */}
      <div className="col col-span-5 lg:col-span-4">
        <ProductGrid products={products ?? MockProducts} />
      </div>
    </div>
  );
};

export default BrowseProductsPage;
