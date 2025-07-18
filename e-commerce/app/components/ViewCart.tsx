// components/ViewCart.tsx
"use client";
import React from "react";
import { CartItem } from "../components/CartItem";
import { CartSummary } from "../components/CartSummary";
import { useCart } from "../context/CartContext";
import { MockProducts } from "../mock-data/MockProducts";

type ViewCartProps = {
  totalItems: number;
  subTotal: number;
  onNext: () => void;
};

export function ViewCart({ totalItems, subTotal, onNext }: ViewCartProps) {
  const { state: cartState, dispatch } = useCart();

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
          className="mt-4 self-end btn btn-primary btn-xl w-fit"
          onClick={onNext}
        >
          Proceed to Next Step
        </button>
      </div>
    </div>
  );
}
