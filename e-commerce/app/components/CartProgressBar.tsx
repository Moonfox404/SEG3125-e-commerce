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
  let currentIndex = stepsMap[current];
  return (
    <div className="flex items-center justify-between w-full p-4 bg-gray-100">
      {steps.map((step, index) => {
        return (
          <React.Fragment key={step.key}>
            <div className="flex flex-col items-center">
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center
                  ${index <= currentIndex ? "bg-accent" : "bg-primary"}`}
              ></div>
              <span className="mt-1 text-xs text-gray-700">{step.label}</span>
            </div>
            {index < steps.length - 1 && (
              <div
                className={`flex-1 h-0.5 mx-2 ${
                  index <= currentIndex - 1 ? "bg-accent" : "bg-primary"
                }`}
              ></div>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}
