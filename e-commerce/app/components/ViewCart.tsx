// components/ViewCart.tsx
"use client";
import React from "react";
import { CartItem } from "../components/CartItem";
import { CartSummary } from "../components/CartSummary";
import { useCart } from "../context/CartContext";
import { MockProducts } from "../mock-data/MockProducts";

type ViewCartProps = {
  onNext: () => void;
};

export function ViewCart({ onNext }: ViewCartProps) {
  const { state: cartState, dispatch } = useCart();

  const totalItems = cartState.reduce((acc, curr) => acc + curr.quantity, 0);
  const subTotal = cartState.reduce((acc, curr) => {
    const product = MockProducts[Number(curr.productId)];
    const price = product.discountedPrice ?? product.price;
    return acc + price * curr.quantity;
  }, 0);

  if (cartState.length === 0) {
    return (
      <div className="p-5 w-[80%] bg-gray-100 text-center">
        <h1 className="bg-white p-5 h-[10vh] rounded-2xl flex justify-center items-center">
          Empty Cart...
        </h1>
      </div>
    );
  }

  return (
    <div className="p-5 w-[80%] bg-gray-100 flex flex-col gap-5">
      {cartState.map((product, i) => (
        <CartItem
          key={i}
          productID={Number(product.productId)}
          selectedStyle={product.style}
          quantity={product.quantity}
          onQuantityChange={(qty) =>
            qty > 0 &&
            dispatch({
              type: "UPDATE_QTY",
              payload: { ...product, quantity: qty },
            })
          }
          onRemove={() =>
            dispatch({
              type: "REMOVE_ITEM",
              payload: { productId: product.productId },
            })
          }
        />
      ))}

      <div className="bg-gray-100 flex flex-col mt-4">
        <CartSummary totalItems={totalItems} subtotal={subTotal} />
        <button
          className="mt-4 self-end bg-accent text-white py-2 rounded w-fit px-5 hover:bg-green-600 transition duration-150 ease-in-out hover:scale-105 cursor-pointer"
          onClick={onNext}
        >
          Proceed to Next Step
        </button>
      </div>
    </div>
  );
}
