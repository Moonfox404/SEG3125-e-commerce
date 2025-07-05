"use client";
import React, { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";

type DeliveryInfo = {
  fullName: string;
  email: string;
  phone: string;
  street: string;
  city: string;
  province: string;
  postalCode: string;
  note?: string;
};

type ConfirmationProps = {
  totalItems: number;
  subTotal: number;
  deliveryInfo: DeliveryInfo;
};

export function Confirmation({
  totalItems,
  subTotal,
  deliveryInfo,
}: ConfirmationProps) {
  const { dispatch } = useCart();
  const [savedTotals] = useState({ totalItems, subTotal });
  // on mount, clear cart as items are purchased
  useEffect(() => {
    dispatch({ type: "CLEAR_CART" });
  }, []);

  return (
    <div className="flex flex-col items-center justify-start p-4 m-5 sm:p-6 bg-gray-100">
      <div className="bg-white p-6 sm:p-8 rounded-lg shadow-md w-full max-w-xl">
        <h1 className="text-xl sm:text-2xl font-semibold mb-4 text-center">
          Order Submitted!
        </h1>
        <p className="mb-6 text-gray-700 text-sm sm:text-base text-center">
          Thank you, <strong>{deliveryInfo.fullName}</strong>. Your order has
          been received and is being processed. A confirmation email will be
          sent to <strong>{deliveryInfo.email}</strong> shortly.
        </p>

        <div className="space-y-4">
          <div>
            <h2 className="text-sm sm:text-lg font-medium mb-1">
              Order Summary
            </h2>
            <div className="flex justify-between text-sm sm:text-base">
              <span>Total Items:</span>
              <span>{savedTotals.totalItems}</span>
            </div>
            <div className="flex justify-between text-sm sm:text-base">
              <span>Subtotal:</span>
              <span>${savedTotals.subTotal.toFixed(2)}</span>
            </div>
          </div>

          <div>
            <h2 className="text-sm sm:text-lg font-medium mb-1">
              Delivery Address
            </h2>
            <p className="text-sm sm:text-base">{deliveryInfo.street}</p>
            <p className="text-sm sm:text-base">
              {deliveryInfo.city}, {deliveryInfo.province},{" "}
              {deliveryInfo.postalCode}
            </p>
          </div>

          <div>
            <h2 className="text-sm sm:text-lg font-medium mb-1">
              Contact Information
            </h2>
            <p className="text-sm sm:text-base">
              <strong>Name:</strong> {deliveryInfo.fullName}
            </p>
            <p className="text-sm sm:text-base">
              <strong>Phone:</strong> {deliveryInfo.phone}
            </p>
          </div>

          {deliveryInfo.note && (
            <div>
              <h2 className="text-sm sm:text-lg font-medium mb-1">
                Delivery Notes
              </h2>
              <p className="text-sm sm:text-base italic">
                "{deliveryInfo.note}"
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
