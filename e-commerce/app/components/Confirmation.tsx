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
  const [showSurvey, setShowSurvey] = useState(false);
  const [submitted, setSubmitted] = useState(false);

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

        {/* Survey Link */}
        <div className="mt-6 text-center">
          {submitted ? (
            <p className="text-primary ">
              Thank you for sharing your shopping experience!
            </p>
          ) : (
            <button
              onClick={() => setShowSurvey(true)}
              className="text-accent underline hover:text-primary transition-all duration-200 ease-in-out cursor-pointer"
            >
              Share your shopping experience
            </button>
          )}
        </div>
      </div>

      <a
        href="/"
        className="mt-5 self-center bg-accent text-white py-2 rounded w-fit px-5 hover:bg-green-600 transition duration-150 ease-in-out hover:scale-105 cursor-pointer"
      >
        Continue Shopping
      </a>
      {/* Survey Modal */}
      {showSurvey && (
        <SurveyModal
          submitted={submitted}
          setSubmitted={setSubmitted}
          onClose={() => setShowSurvey(false)}
        />
      )}
    </div>
  );
}

function SurveyModal({
  submitted,
  setSubmitted,
  onClose,
}: {
  submitted: boolean;
  setSubmitted: (flag: boolean) => void;
  onClose: () => void;
}) {
  const [feedback, setFeedback] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 max-w-md">
        {!submitted ? (
          <>
            <h2 className="text-xl font-semibold mb-4">
              Share Your Experience
            </h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <label htmlFor="feedback" className="text-sm font-medium">
                How was your shopping experience?
              </label>
              <textarea
                id="feedback"
                name="feedback"
                rows={4}
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                required
                className="border p-2 rounded w-full"
              />
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="self-center bg-primary text-white py-2 rounded w-fit px-5 hover:bg-green-800 transition duration-150 ease-in-out hover:scale-105 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="self-center bg-accent text-white py-2 rounded w-fit px-5 hover:bg-green-600 transition duration-150 ease-in-out hover:scale-105 cursor-pointer"
                >
                  Submit
                </button>
              </div>
            </form>
          </>
        ) : (
          <div className="text-center">
            <h2 className="text-xl font-semibold mb-4">Thank you!</h2>
            <p className="mb-4">We appreciate your feedback.</p>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-primary text-white rounded hover:bg-green-700"
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
