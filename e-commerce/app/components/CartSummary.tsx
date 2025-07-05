"use client";
import React from "react";

type CartSummaryProps = {
  totalItems: number;
  subtotal: number;
};

export function CartSummary({ totalItems, subtotal }: CartSummaryProps) {
  return (
    <div className="bg-white p-4 shadow w-full flex flex-col items-end">
      <h2 className="text-lg font-semibold">Order Summary</h2>
      <div className="flex flex-col">
        <div className="flex gap-5 mt-2 w-full justify-between">
          <span>Total items:</span>
          <span className="text-right">{totalItems}</span>
        </div>
        <div className="flex gap-10 mt-1 w-full justify-between">
          <span>Subtotal:</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
}
