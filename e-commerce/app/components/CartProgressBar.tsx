import React from "react";

type Step = "cart" | "delivery" | "payment" | "confirmation";

interface CartProgressBarProps {
  current: Step;
}

const steps: { key: Step; label: string }[] = [
  { key: "cart", label: "View Cart" },
  { key: "delivery", label: "Delivery Information" },
  { key: "payment", label: "Payment Information" },
  { key: "confirmation", label: "Confirmation" },
];

const stepsMap = {
  cart: 0,
  delivery: 1,
  payment: 2,
  confirmation: 3,
};

export function CartProgressBar({ current }: CartProgressBarProps) {
  const currentIndex = stepsMap[current];
  return (
    <div className="w-full p-2 bg-gray-100">
      <div className="flex items-center justify-between overflow-x-auto scrollbar-hide">
        {steps.map((step, index) => (
          <React.Fragment key={step.key}>
            <div className="flex-shrink-0 flex flex-col items-center min-w-[60px] sm:min-w-[80px]">
              <div
                className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center
                  ${index <= currentIndex ? "bg-accent" : "bg-primary"}`}
              ></div>
              <span className="mt-1 text-[10px] sm:text-xs text-gray-700 text-center">
                {step.label}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div
                className={`flex-1 h-0.5 mx-1 sm:mx-2 flex-shrink-0 min-w-[20px]
                  ${index < currentIndex ? "bg-accent" : "bg-primary"}`}
              ></div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
