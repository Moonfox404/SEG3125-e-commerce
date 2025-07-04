import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { Product } from "../mock-data/MockProducts";
import ColourSquares from "./ColourSquares";
import Rating from "./Rating";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";

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
};

const percentFromDiscounted = (
  discountedPrice: number | undefined,
  price: number
) => {
  const diff = price - (discountedPrice ?? price);
  return Math.ceil((diff / price) * 100);
};

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <div className="card w-100">
      <figure>
        {product.discounted && (
          <div className="badge badge-accent badge-xl absolute top-2 right-2">
            SAVE {percentFromDiscounted(product.discountedPrice, product.price)}
            %
          </div>
        )}
        <a href={`/product/${product.id}`}>
          <img src={"./products/" + product.id + ".png"} alt={product.name} />
        </a>
      </figure>
      <div className="card-body grid grid-cols-3">
        <div className="col col-span-2">
          <h2 className="card-title">{product.name}</h2>
          <p>{truncateDescription(product.details)}</p>
          <div className="flex w-fit items-center my-2">
            <Rating rating={product.rating} />
            <p className="ml-2">
              {roundTo(product.rating, 2) + " (" + product.numRatings + ")"}
            </p>
          </div>
          <div className="flex w-fit text-lg mt-4">
            <p className={product.discounted ? "line-through" : ""}>
              ${product.price}
            </p>
            {product.discounted && (
              <p className="text-red-700 ml-2">${product.discountedPrice}</p>
            )}
          </div>
        </div>

        <div className="col flex flex-col items-end">
          {product.styles && <ColourSquares colours={product.styles} />}
          <div className="card-actions py-5">
            <button className="btn btn-primary">
              <FontAwesomeIcon icon={faCartShopping} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
