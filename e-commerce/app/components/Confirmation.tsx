"use client";
import React, { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as faStarFull } from "@fortawesome/free-solid-svg-icons";

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

      <a href="/" className="mt-4 btn btn-primary btn-xl w-fit self-center">
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
  const [findability, setFindability] = useState("");
  const [experienceRating, setExperienceRating] = useState(0);
  const [favoriteFeature, setFavoriteFeature] = useState("");
  const [improvement, setImprovement] = useState("");
  const [recommend, setRecommend] = useState("yes");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 10; i++) {
      stars.push(
        <FontAwesomeIcon
          key={i}
          icon={faStarFull}
          className={`cursor-pointer text-xl ${
            i <= experienceRating ? "text-yellow-500" : "text-gray-300"
          }`}
          onClick={() => setExperienceRating(i)}
        />
      );
    }
    return stars;
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
              {/* Findability */}
              <div className="flex flex-col">
                <label htmlFor="findability" className="text-sm font-medium">
                  Did you find what you were looking for?
                </label>
                <textarea
                  id="findability"
                  rows={3}
                  value={findability}
                  onChange={(e) => setFindability(e.target.value)}
                  required
                  className="border p-2 rounded w-full"
                />
              </div>

              {/* Overall satisfaction */}
              <div className="flex flex-col">
                <label
                  htmlFor="experienceRating"
                  className="text-sm font-medium mb-2"
                >
                  How would you rate your overall shopping experience?
                </label>
                <div
                  id="experienceRating"
                  className="flex gap-1 max-[330px]:scale-90"
                >
                  {renderStars()}
                </div>
                <span className="text-sm text-gray-600 mt-1 max-[330px]:self-center">
                  {experienceRating} / 10
                </span>
              </div>

              {/* Favorite feature */}
              <div className="flex flex-col">
                <label
                  htmlFor="favoriteFeature"
                  className="text-sm font-medium"
                >
                  What did you like most about the shopping process?
                </label>
                <textarea
                  id="favoriteFeature"
                  rows={3}
                  value={favoriteFeature}
                  onChange={(e) => setFavoriteFeature(e.target.value)}
                  required
                  className="border p-2 rounded w-full"
                />
              </div>

              {/* Improvement */}
              <div className="flex flex-col">
                <label htmlFor="improvement" className="text-sm font-medium">
                  What could we improve to make your next visit better?
                </label>
                <textarea
                  id="improvement"
                  rows={3}
                  value={improvement}
                  onChange={(e) => setImprovement(e.target.value)}
                  required
                  className="border p-2 rounded w-full"
                />
              </div>

              {/* Recommendation */}
              <div className="flex flex-col">
                <span className="text-sm font-medium">
                  Would you recommend us to a friend?
                </span>
                <div className="flex gap-4 mt-1">
                  <label className="flex items-center gap-1">
                    <input
                      type="radio"
                      name="recommend"
                      value="yes"
                      checked={recommend === "yes"}
                      onChange={(e) => setRecommend(e.target.value)}
                    />
                    Yes
                  </label>
                  <label className="flex items-center gap-1">
                    <input
                      type="radio"
                      name="recommend"
                      value="no"
                      checked={recommend === "no"}
                      onChange={(e) => setRecommend(e.target.value)}
                    />
                    No
                  </label>
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="self-center btn btn-primary btn-md w-fit bg-stone-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="self-center btn btn-primary btn-md w-fit"
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
