import NavBar from "../components/NavBar";
import ProductDetails from "../components/ProductDetails";
import ProductImages from "../components/ProductImages";

export default function Product() {
  return (
    <div>
      <NavBar itemsInCart={2} />
      <div className="w-full h-screen flex items-center justify-center">
        <ProductImages productID={0} />
        <ProductDetails productID={0} />
      </div>
    </div>
  );
}
