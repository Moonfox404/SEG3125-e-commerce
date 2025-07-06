"use client";
import { useState } from "react";
import { CartProgressBar } from "../components/CartProgressBar";
import NavBar from "../components/NavBar";
import { ViewCart } from "../components/ViewCart";
import { DeliveryInfo } from "../components/DeliveryInfo";
import { Payment, PaymentInfo } from "../components/Payment";
import { Confirmation } from "../components/Confirmation";
import { useCart } from "../context/CartContext";
import { MockProducts } from "../mock-data/MockProducts";

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

  const { state: cartState } = useCart();

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

  const [paymentInfo, setPaymentInfo] = useState<PaymentInfo>({
    cardName: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
    useDeliveryAddress: false,
    billingAddress: {
      street: "",
      city: "",
      province: "",
      postalCode: "",
    },
  });

  const totalItems = cartState.reduce((acc, curr) => acc + curr.quantity, 0);
  const subTotal = cartState.reduce((acc, curr) => {
    const product = MockProducts[Number(curr.productId)];
    const price = product.discountedPrice ?? product.price;
    return acc + price * curr.quantity;
  }, 0);

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
      <div className="w-full flex flex-col items-center justify-center gap-5">
        <div className="p-5 w-[80%] bg-gray-100">
          <CartProgressBar current={step}></CartProgressBar>
        </div>

        {step === "cart" && (
          <ViewCart
            totalItems={totalItems}
            subTotal={subTotal}
            onNext={handleNext}
          />
        )}

        {step === "delivery" && (
          <DeliveryInfo
            info={info}
            setInfo={setInfo}
            onNext={handleNext}
            onBack={handleBack}
          />
        )}

        {step === "payment" && (
          <Payment
            paymentInfo={paymentInfo}
            setPaymentInfo={setPaymentInfo}
            onNext={handleNext}
            onBack={handleBack}
          />
        )}

        {step === "confirmation" && (
          <Confirmation
            totalItems={totalItems}
            subTotal={subTotal}
            deliveryInfo={info}
          />
        )}
      </div>
    </div>
  );
}
