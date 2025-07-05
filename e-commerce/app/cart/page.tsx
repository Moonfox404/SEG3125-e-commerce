"use client";
import { useState } from "react";
import { CartProgressBar } from "../components/CartProgressBar";
import NavBar from "../components/NavBar";
import { ViewCart } from "../components/ViewCart";
import { DeliveryInfo } from "../components/DeliveryInfo";

type Step = "cart" | "delivery" | "payment" | "confirmation";

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

export default function Cart() {
  const [step, setStep] = useState<Step>("cart");

  const [info, setInfo] = useState<DeliveryInfo>({
    fullName: "",
    email: "",
    phone: "",
    street: "",
    city: "",
    province: "",
    postalCode: "",
    note: "",
  });

  const handleNext = () => {
    switch (step) {
      case "cart":
        setStep("delivery");
        break;
      case "delivery":
        setStep("payment");
        break;
      case "payment":
        setStep("confirmation");
        break;
    }
  };

  const handleBack = () => {
    switch (step) {
      case "delivery":
        setStep("cart");
        break;
      case "payment":
        setStep("delivery");
        break;
    }
  };

  return (
    <div>
      <NavBar />
      <div className="w-full h-screen flex flex-col items-center justify-center gap-5">
        <div className="p-5 w-[80%] bg-gray-100">
          <CartProgressBar current={step}></CartProgressBar>
        </div>

        {step === "cart" && <ViewCart onNext={handleNext} />}

        {step === "delivery" && (
          <DeliveryInfo
            info={info}
            setInfo={setInfo}
            onNext={handleNext}
            onBack={handleBack}
          />
        )}
      </div>
    </div>
  );
}
