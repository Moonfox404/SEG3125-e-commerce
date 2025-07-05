"use client";
import { ChangeEvent, FormEvent } from "react";

type DeliveryInfo = {
  fullName: string;
  email: string;
  phone: string;
  street: string;
  city: string;
  province: string;
  postalCode: string;
  note: string;
};

type DeliveryInfoProps = {
  info: DeliveryInfo;
  setInfo: (info: any) => void;
  onNext: () => void;
  onBack: () => void;
};

export function DeliveryInfo({
  info,
  setInfo,
  onNext,
  onBack,
}: DeliveryInfoProps) {
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setInfo((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log(info);
    // You could validate here or send to context/state
    onNext();
  };

  return (
    <div className="p-6 w-[80%] bg-gray-100 flex flex-col gap-6">
      <h2 className="text-xl font-semibold">Delivery Information</h2>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 shadow flex flex-col gap-4"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="fullName"
            value={info.fullName}
            onChange={handleChange}
            placeholder="Full Name"
            required
            className="border p-2 rounded w-full"
          />
          <input
            type="email"
            name="email"
            value={info.email}
            onChange={handleChange}
            placeholder="Email"
            required
            className="border p-2 rounded w-full"
          />
          <input
            type="tel"
            name="phone"
            value={info.phone}
            onChange={handleChange}
            placeholder="Phone Number"
            required
            className="border p-2 rounded w-full"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="street"
            value={info.street}
            onChange={handleChange}
            placeholder="Street Address"
            required
            className="border p-2 rounded w-full"
          />
          <input
            type="text"
            name="city"
            value={info.city}
            onChange={handleChange}
            placeholder="City"
            required
            className="border p-2 rounded w-full"
          />
          <input
            type="text"
            name="province"
            value={info.province}
            onChange={handleChange}
            placeholder="Province"
            required
            className="border p-2 rounded w-full"
          />
          <input
            type="text"
            name="postalCode"
            value={info.postalCode}
            onChange={handleChange}
            placeholder="Postal Code"
            required
            className="border p-2 rounded w-full"
          />
        </div>

        <textarea
          name="note"
          value={info.note}
          onChange={handleChange}
          placeholder="Delivery Note (Optional)"
          rows={4}
          className="border p-2 rounded w-full"
        />

        <div className="flex flex-row justify-between">
          <button
            type="submit"
            className="mt-4 self-center bg-primary text-white py-2 rounded w-fit px-5 hover:bg-green-800 transition duration-150 ease-in-out hover:scale-105 cursor-pointer"
            onClick={onBack}
          >
            Back to Cart
          </button>
          <button
            type="submit"
            className="mt-4 self-center bg-accent text-white py-2 rounded w-fit px-5 hover:bg-green-600 transition duration-150 ease-in-out hover:scale-105 cursor-pointer"
          >
            Continue
          </button>
        </div>
      </form>

      {/* Delivery Summary */}
      <div className="bg-white p-6 shadow">
        <h3 className="text-lg font-medium mb-2">Delivery Summary</h3>
        <p>
          <strong>Name:</strong> {info.fullName || "..."}
        </p>
        <p>
          <strong>Email:</strong> {info.email || "..."}
        </p>
        <p>
          <strong>Phone:</strong> {info.phone || "..."}
        </p>
        <p>
          <strong>Address:</strong> {info.street}, {info.city}, {info.province},{" "}
          {info.postalCode}
        </p>
        {info.note && (
          <p>
            <strong>Note:</strong> {info.note}
          </p>
        )}
      </div>
    </div>
  );
}
