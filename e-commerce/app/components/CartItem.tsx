"use client";
import React, { useState } from "react";
import Image from "next/image";
import { MockProducts } from "../mock-data/MockProducts";
import { useCart } from "../context/CartContext";

type CartItemProps = {
  productID: number;
  selectedStyle: string | number;
  quantity: number;
  onQuantityChange: (newQty: number) => void;
  onRemove: () => void;
};
export function CartItem({
  productID,
  selectedStyle,
  quantity,
  onQuantityChange,
  onRemove,
}: CartItemProps) {
  const product = MockProducts[productID];
  return (
    <div className="flex flex-col sm:flex-row items-center bg-white p-4 sm:p-5 shadow mb-4">
      <div className="w-full sm:w-24 h-48 sm:h-24 relative mb-4 sm:mb-0">
        <img
          src={`../../products/${product.id}.png`}
          alt={product.name}
          className="w-full h-full object-contain rounded"
        />
      </div>
      <div className="flex-1 px-0 sm:px-4 w-full">
        <h3 className="font-semibold text-lg truncate">{product.name}</h3>
        {product.styles && (
          <p className="text-sm text-gray-600">Styles: {selectedStyle}</p>
        )}
        <div className="flex items-center mt-2">
          <button
            className="px-2 cursor-pointer hover:scale-110 duration-75 ease-in-out"
            onClick={() => onQuantityChange(Math.max(1, quantity - 1))}
          >
            –
          </button>
          <span className="px-4 text-base">{quantity}</span>
          <button
            className="px-2 cursor-pointer hover:scale-110 duration-75 ease-in-out"
            onClick={() => onQuantityChange(quantity + 1)}
          >
            +
          </button>
        </div>
        <button
          className="mt-2 text-red-500 text-sm cursor-pointer hover:scale-105 hover:text-red-700 transition-all duration-200 ease-in-out"
          onClick={onRemove}
        >
          Remove
        </button>
      </div>
      <div className="w-full sm:w-24 text-right font-semibold mt-4 sm:mt-0">
        <div className="flex flex-col items-end">
          {product.discounted && product.discountedPrice ? (
            <>
              <span className="text-gray-400 line-through text-sm">
                ${(product.price * quantity).toFixed(2)}
              </span>
              <span className="text-xl sm:text-lg font-bold text-red-600">
                ${(product.discountedPrice * quantity).toFixed(2)}
              </span>
            </>
          ) : (
            <span className="text-xl sm:text-lg font-bold">
              ${(product.price * quantity).toFixed(2)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
