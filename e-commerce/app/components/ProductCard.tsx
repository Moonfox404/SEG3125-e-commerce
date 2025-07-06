import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { Product } from "../mock-data/MockProducts";
import ColourSquares from "./ColourSquares";
import Rating from "./Rating";
import Link from "next/link";
import { faTag } from "@fortawesome/free-solid-svg-icons";

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
    <div className="card w-full">
      <figure className="relative w-full h-80 overflow-hidden rounded-t-lg">
        {product.discounted && (
          <div className="badge badge-accent badge-xl absolute top-2 right-2">
            <FontAwesomeIcon icon={faTag} />
            SAVE {percentFromDiscounted(product.discountedPrice, product.price)}
            %
          </div>
        )}
        <a href={`/product/${product.id}`} className="block w-full h-full">
          <img
            src={"/products/" + product.id + ".png"}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </a>
      </figure>
      <div className="card-body grid grid-cols-1 md:grid-cols-3">
        <div className="col md:col-span-2">
          <Link href={`/product/${product.id}`}>
            <h2 className="card-title">{product.name}</h2>
          </Link>
          <p>{truncateDescription(product.details)}</p>

          <div className="flex w-fit items-center my-2">
            <Rating rating={product.rating} />
            <p className="ml-2">
              {roundTo(product.rating, 2) + " (" + product.numRatings + ")"}
            </p>
          </div>
          <div className="flex w-fit text-lg mt-4 items-baseline">
            {product.discounted && (
              <p className="text-amber-700">${product.discountedPrice}</p>
            )}
            <p className={(product.discounted ? "line-through text-gray-400 text-sm " : "") + "ml-2"}>
              ${product.price}
            </p>
          </div>
        </div>

        <div className="col flex items-center md:flex-col md:items-end">
          {product.styles && <ColourSquares colours={product.styles} />}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
