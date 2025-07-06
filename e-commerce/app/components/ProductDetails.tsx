"use client";
import { MockProducts, Product } from "../mock-data/MockProducts";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar,
  faStarHalfStroke,
  faStar as faStarEmpty,
} from "@fortawesome/free-solid-svg-icons";
import { useCart } from "../context/CartContext";

type ProductDetailsProps = {
  productID: number;
};

export default function ProductDetails({ productID }: ProductDetailsProps) {
  const product: Product = MockProducts[productID];
  const [quantity, setQuantity] = useState(1);

  const increaseQty = () => setQuantity((q) => q + 1);
  const decreaseQty = () => setQuantity((q) => Math.max(1, q - 1));

  const fullStars = Math.floor(product.rating);
  const hasHalf = product.rating - fullStars >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalf ? 1 : 0);

  const [selectedStyle, setSelectedStyle] = useState(
    product.styles ? product.styles[0] : ""
  );

  const { dispatch } = useCart();

  function handleAdd() {
    dispatch({
      type: "ADD_ITEM",
      payload: {
        productId: product.id,
        quantity: quantity,
        style: selectedStyle,
      },
    });
  }

  return (
    <div className="flex flex-col gap-4 max-w-2xl p-4">
      <h1 className="text-2xl font-semibold">{product.name}</h1>
      <div className="flex items-baseline gap-2">
        {product.discounted && product.discountedPrice ? (
          <>
            <span className="text-gray-400 line-through">
              ${product.price.toFixed(2)}
            </span>
            <span className="text-xl font-bold text-red-600">
              ${product.discountedPrice.toFixed(2)}
            </span>
          </>
        ) : (
          <span className="text-xl font-bold">${product.price.toFixed(2)}</span>
        )}
      </div>

      <div className="flex items-center gap-1">
        {Array.from({ length: fullStars }).map((_, i) => (
          <FontAwesomeIcon key={i} icon={faStar} />
        ))}
        {hasHalf && <FontAwesomeIcon icon={faStarHalfStroke} key="half" />}
        {Array.from({ length: emptyStars }).map((_, i) => (
          <FontAwesomeIcon
            key={i + fullStars + 1}
            icon={faStarEmpty}
            className="opacity-30"
          />
        ))}
        <span className="text-sm text-gray-600">({product.numRatings})</span>
      </div>

      {/* Styles */}
      {product.styles && (
        <div>
          <h2 className="text-sm font-medium uppercase">Styles:</h2>
          <div className="flex gap-2 mt-1">
            {product.styles.map((style) => (
              <div
                key={style}
                className={`w-6 h-6 rounded-full cursor-pointer  ${
                  selectedStyle === style
                    ? "border-2 border-black scale-115 transition-all duration-150 ease-in-out"
                    : ""
                }`}
                style={{ backgroundColor: style }}
                onClick={() => setSelectedStyle(style)}
              />
            ))}
          </div>
        </div>
      )}

      <div className="flex items-center gap-4">
        <span className={product.inStock ? "text-green-600" : "text-red-600"}>
          {product.inStock ? "In Stock" : "Out of Stock"}
        </span>
        {product.inStock && (
          <div className="flex items-center rounded">
            <button
              onClick={decreaseQty}
              className="px-2 cursor-pointer hover:scale-125 duration-75 ease-in-out"
            >
              –
            </button>
            <span className="px-4">{quantity}</span>
            <button
              onClick={increaseQty}
              className="px-2 cursor-pointer hover:scale-125 duration-75 ease-in-out"
            >
              +
            </button>
          </div>
        )}
      </div>

      <div>
        <h2 className="text-sm font-medium uppercase">Description</h2>
        <p className="mt-2 text-gray-700">{product.details}</p>
      </div>

      <button
        className="mt-4 w-full bg-black text-white py-3 font-medium rounded hover:bg-accent hover:text-black transition-all duration-200 ease-in-out cursor-pointer active:bg-primary active:text-white"
        disabled={!product.inStock}
        onClick={handleAdd}
      >
        Add to Cart
      </button>
    </div>
  );
}
