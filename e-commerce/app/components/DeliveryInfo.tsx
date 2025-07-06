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
    onNext();
  };

  return (
    <div className="p-6 w-[80%] bg-gray-100 flex flex-col gap-6">
      <h2 className="text-xl font-semibold">Delivery Information</h2>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 shadow flex flex-col gap-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col">
            <label htmlFor="fullName" className="text-sm font-medium mb-1">
              Full Name
            </label>
            <input
              id="fullName"
              type="text"
              name="fullName"
              value={info.fullName}
              onChange={handleChange}
              placeholder="John Doe"
              required
              className="border p-2 rounded w-full"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="email" className="text-sm font-medium mb-1">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              name="email"
              value={info.email}
              onChange={handleChange}
              placeholder="you@example.com"
              required
              className="border p-2 rounded w-full"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="phone" className="text-sm font-medium mb-1">
              Phone Number
            </label>
            <input
              id="phone"
              type="tel"
              name="phone"
              value={info.phone}
              onChange={handleChange}
              placeholder="123-456-7890"
              required
              className="border p-2 rounded w-full"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col">
            <label htmlFor="street" className="text-sm font-medium mb-1">
              Street Address
            </label>
            <input
              id="street"
              type="text"
              name="street"
              value={info.street}
              onChange={handleChange}
              placeholder="123 Main St"
              required
              className="border p-2 rounded w-full"
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
              value={info.city}
              onChange={handleChange}
              placeholder="Toronto"
              required
              className="border p-2 rounded w-full"
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
              value={info.province}
              onChange={handleChange}
              placeholder="Ontario"
              required
              className="border p-2 rounded w-full"
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
              value={info.postalCode}
              onChange={handleChange}
              placeholder="A1A 1A1"
              required
              className="border p-2 rounded w-full"
            />
          </div>
        </div>

        <div className="flex flex-col">
          <label htmlFor="note" className="text-sm font-medium mb-1">
            Delivery Note (Optional)
          </label>
          <textarea
            id="note"
            name="note"
            value={info.note}
            onChange={handleChange}
            placeholder="Leave any special instructions here"
            rows={4}
            className="border p-2 rounded w-full"
          />
        </div>

        <div className="flex justify-between gap-5 max-sm:flex-col">
          <button
            type="button"
            onClick={onBack}
            className="mt-4 self-center bg-primary text-white py-2 rounded w-fit px-5 hover:bg-green-800 transition duration-150 ease-in-out hover:scale-105 cursor-pointer"
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

      <div className="bg-white p-6 shadow overflow-scroll">
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
