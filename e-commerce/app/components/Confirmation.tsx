"use client";
import React, { useEffect } from "react";

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
  // on mount, clear cart as items are purchased
  useEffect(() => {
    window.localStorage.removeItem("cart");
  }, []);
  return (
    <div className="w-[80%] flex flex-col items-center justify-center p-6 bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-lg text-center">
        <h1 className="text-2xl font-semibold mb-4">Order Submitted!</h1>
        <p className="mb-6 text-gray-700">
          Thank you, <strong>{deliveryInfo.fullName}</strong>. Your order has
          been received and is being processed. A confirmation email will be
          sent to <strong>{deliveryInfo.email}</strong> shortly.
        </p>

        <div className="text-left">
          <h2 className="text-lg font-medium mb-2">Order Summary</h2>
          <div className="flex justify-between mb-1">
            <span>Total Items:</span>
            <span>{totalItems}</span>
          </div>
          <div className="flex justify-between mb-4">
            <span>Subtotal:</span>
            <span>${subTotal.toFixed(2)}</span>
          </div>

          <h2 className="text-lg font-medium mb-2">Delivery Address</h2>
          <p>{deliveryInfo.street}</p>
          <p>
            {deliveryInfo.city}, {deliveryInfo.province},{" "}
            {deliveryInfo.postalCode}
          </p>

          <h2 className="text-lg font-medium mb-2 mt-4">Contact Information</h2>
          <p>
            <strong>Name:</strong> {deliveryInfo.fullName}
          </p>
          <p>
            <strong>Phone:</strong> {deliveryInfo.phone}
          </p>
          {deliveryInfo.note && (
            <div className="mt-4">
              <h2 className="text-lg font-medium mb-1">Delivery Notes</h2>
              <p className="italic">"{deliveryInfo.note}"</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
