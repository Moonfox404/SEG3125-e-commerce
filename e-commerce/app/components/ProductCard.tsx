import type { Product } from "../mock-data/MockProducts";
import ColourSquares from "./ColourSquares";
import Rating from "./Rating";

const MAX_DESCR_CHARS = 50;

type ProductCardProps = {
  product: Product;
};

const truncateDescription = (descr: string) => {
  if (descr.length < MAX_DESCR_CHARS) {
    return descr;
  }

  return descr.slice(0, MAX_DESCR_CHARS - 3) + "...";
};

const roundTo = (float: number, places: number) => {
  const shift = Math.pow(10, places);
  return Math.round(float * shift) / shift;
}

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <div className="card">
      <figure>
        <img
          src={"./products/" + product.id}
          alt={product.name} />
      </figure>
      <div className="card-body grid grid-cols-2">
        <div className="col">
          <h2 className="card-title">{product.name}</h2>
          <p>{truncateDescription(product.details)}</p>
          <div className="flex">
            <Rating rating={product.rating} />
            <p>{roundTo(product.rating, 2) + " (" + product.numRatings + ")"}</p>
          </div>
          <div className="flex">
            <p className={product.discounted ? "line-through" : ""}>${product.price}</p>
            {product.discounted && <p className="text-red-700">${product.discountedPrice}</p>}
          </div>
        </div>

        <div className="col">
          {product.styles && <ColourSquares colours={product.styles} />}
          <button></button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
