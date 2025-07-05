"use client";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";

export type BillingAddress = {
  street: string;
  city: string;
  province: string;
  postalCode: string;
};

export type PaymentInfo = {
  cardName: string;
  cardNumber: string;
  expiry: string;
  cvv: string;
  useDeliveryAddress: boolean;
  billingAddress: BillingAddress;
};

type PaymentProps = {
  paymentInfo: PaymentInfo;
  setPaymentInfo: (info: PaymentInfo) => void;
  onBack: () => void;
  onNext: () => void;
};

export function Payment({
  paymentInfo,
  setPaymentInfo,
  onBack,
  onNext,
}: PaymentProps) {
  const [loadingStage, setLoadingStage] = useState<
    "idle" | "verifying" | "completing"
  >("idle");
  const [errors, setErrors] = useState({
    cardNumber: false,
    expiry: false,
    cvv: false,
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked } = e.target;
    let sanitized = value;

    // numeric-only sanitization
    if (name === "cardNumber" || name === "cvv") {
      sanitized = value.replace(/\D/g, "");
    }
    if (name === "expiry") {
      sanitized = value.replace(/[^\d\/]/g, "");
    }

    if (name === "useDeliveryAddress") {
      setPaymentInfo({ ...paymentInfo, useDeliveryAddress: checked });
    } else if (["street", "city", "province", "postalCode"].includes(name)) {
      setPaymentInfo({
        ...paymentInfo,
        billingAddress: { ...paymentInfo.billingAddress, [name]: sanitized },
      });
    } else {
      setPaymentInfo({ ...paymentInfo, [name]: sanitized });
    }

    // validate on change
    if (name === "cardNumber") {
      setErrors((e) => ({
        ...e,
        cardNumber: sanitized.length < 13 || sanitized.length > 19,
      }));
    }
    if (name === "expiry") {
      const valid = /^((0[1-9]|1[0-2])\/[0-9]{2})$/.test(sanitized);
      setErrors((e) => ({ ...e, expiry: !valid }));
    }
    if (name === "cvv") {
      setErrors((e) => ({
        ...e,
        cvv: sanitized.length < 3 || sanitized.length > 4,
      }));
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // prevent submit if errors
    if (errors.cardNumber || errors.expiry || errors.cvv) return;
    setLoadingStage("verifying");
    setTimeout(() => {
      setLoadingStage("completing");
      setTimeout(() => {
        setLoadingStage("idle");
        onNext();
      }, 2000);
    }, 2000);
  };

  return (
    <div className="p-6 w-[80%] bg-gray-100 flex flex-col gap-6">
      {loadingStage !== "idle" && (
        <div className="fixed inset-0 bg-black/75 flex items-center justify-center z-50 overflow-hidden">
          <div className="text-center">
            <p className="text-white font-bold text-2xl flex flex-col gap-2">
              {loadingStage === "verifying" && "Verifying payment info..."}
              {loadingStage === "completing" && "Completing transaction..."}
              <span className="loading loading-spinner loading-xl self-center"></span>
            </p>
          </div>
        </div>
      )}

      <h2 className="text-xl font-semibold">Payment Information</h2>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 shadow flex flex-col gap-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col">
            <label htmlFor="cardName" className="text-sm font-medium mb-1">
              Name on Card
            </label>
            <input
              id="cardName"
              type="text"
              name="cardName"
              value={paymentInfo.cardName}
              onChange={handleChange}
              placeholder="Exact name as on card"
              required
              className="border p-2 rounded w-full"
              disabled={loadingStage !== "idle"}
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="cardNumber" className="text-sm font-medium mb-1">
              Card Number (13–19 digits)
            </label>
            <input
              id="cardNumber"
              type="text"
              name="cardNumber"
              inputMode="numeric"
              pattern="\d{13,19}"
              minLength={13}
              maxLength={19}
              value={paymentInfo.cardNumber}
              onChange={handleChange}
              placeholder="1234 5678 9012 3456"
              required
              className={`border p-2 rounded w-full ${
                errors.cardNumber ? "border-red-500" : ""
              }`}
              disabled={loadingStage !== "idle"}
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="expiry" className="text-sm font-medium mb-1">
              Expiry Date (MM/YY)
            </label>
            <input
              id="expiry"
              type="text"
              name="expiry"
              placeholder="MM/YY"
              pattern="(0[1-9]|1[0-2])/[0-9]{2}"
              maxLength={5}
              value={paymentInfo.expiry}
              onChange={handleChange}
              required
              className={`border p-2 rounded w-full ${
                errors.expiry ? "border-red-500" : ""
              }`}
              disabled={loadingStage !== "idle"}
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="cvv" className="text-sm font-medium mb-1">
              CVV (3–4 digits)
            </label>
            <input
              id="cvv"
              type="text"
              name="cvv"
              inputMode="numeric"
              pattern="\d{3,4}"
              minLength={3}
              maxLength={4}
              value={paymentInfo.cvv}
              onChange={handleChange}
              placeholder="123"
              required
              className={`border p-2 rounded w-full ${
                errors.cvv ? "border-red-500" : ""
              }`}
              disabled={loadingStage !== "idle"}
            />
          </div>
        </div>

        <div className="flex items-center gap-2 mt-4">
          <input
            type="checkbox"
            id="useDeliveryAddress"
            name="useDeliveryAddress"
            checked={paymentInfo.useDeliveryAddress}
            onChange={handleChange}
            className="h-4 w-4"
            disabled={loadingStage !== "idle"}
          />
          <label htmlFor="useDeliveryAddress" className="text-sm">
            Billing address same as delivery
          </label>
        </div>

        {!paymentInfo.useDeliveryAddress && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            <div className="flex flex-col">
              <label htmlFor="street" className="text-sm font-medium mb-1">
                Street Address
              </label>
              <input
                id="street"
                type="text"
                name="street"
                value={paymentInfo.billingAddress.street}
                onChange={handleChange}
                placeholder="123 Main St"
                required
                className="border p-2 rounded w-full"
                disabled={loadingStage !== "idle"}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="city" className="text-sm font-medium mb-1">
                City
              </label>
              <input
                id="city"
                type="text"
                name="city"
                value={paymentInfo.billingAddress.city}
                onChange={handleChange}
                placeholder="Toronto"
                required
                className="border p-2 rounded w-full"
                disabled={loadingStage !== "idle"}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="province" className="text-sm font-medium mb-1">
                Province
              </label>
              <input
                id="province"
                type="text"
                name="province"
                value={paymentInfo.billingAddress.province}
                onChange={handleChange}
                placeholder="Ontario"
                required
                className="border p-2 rounded w-full"
                disabled={loadingStage !== "idle"}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="postalCode" className="text-sm font-medium mb-1">
                Postal Code
              </label>
              <input
                id="postalCode"
                type="text"
                name="postalCode"
                value={paymentInfo.billingAddress.postalCode}
                onChange={handleChange}
                placeholder="A1A 1A1"
                required
                className="border p-2 rounded w-full"
                disabled={loadingStage !== "idle"}
              />
            </div>
          </div>
        )}

        <div className="flex justify-between gap-5 max-sm:flex-col">
          <button
            type="button"
            onClick={onBack}
            className="mt-4 self-center bg-primary text-white py-2 rounded w-fit px-5 hover:bg-green-800 transition duration-150 ease-in-out hover:scale-105 cursor-pointer"
            disabled={loadingStage !== "idle"}
          >
            Back
          </button>
          <button
            type="submit"
            className="mt-4 self-center bg-accent text-white py-2 rounded w-fit px-5 hover:bg-green-600 transition duration-150 ease-in-out hover:scale-105 cursor-pointer"
            disabled={loadingStage !== "idle"}
          >
            Continue
          </button>
        </div>
      </form>
    </div>
  );
}
