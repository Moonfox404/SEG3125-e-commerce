"use client";
import { useEffect, useState } from "react";
import { CartItem } from "../components/CartItem";
import { CartProgressBar } from "../components/CartProgressBar";
import { CartSummary } from "../components/CartSummary";
import NavBar from "../components/NavBar";
import { useCart } from "../context/CartContext";
import { MockProducts } from "../mock-data/MockProducts";

type Step = "cart" | "delivery" | "payment" | "confirmation";

export default function Cart() {
  const { state: cartState, dispatch } = useCart();
  const [step, setStep] = useState<Step>("cart");

  const totalItems = cartState.reduce((acc, curr) => acc + curr.quantity, 0);
  const subTotal = cartState.reduce((acc, curr) => {
    const product = MockProducts[Number(curr.productId)];
    const price = product.discountedPrice ?? product.price;
    const total = price * curr.quantity;
    return acc + total;
  }, 0);

  const handleNext = () => {
    if (step === "cart") setStep("delivery");
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

  return (
    <div>
      <NavBar />
      <div className="w-full h-screen flex flex-col items-center justify-center gap-5">
        <div className="p-5 w-[80%] bg-gray-100">
          <CartProgressBar current={step}></CartProgressBar>
        </div>

        {cartState.length > 0 ? (
          <div className="p-5 w-[80%] bg-gray-100 gap-5 flex flex-col">
            {cartState.map((product, index) => {
              return (
                <CartItem
                  productID={Number(product.productId)}
                  selectedStyle={product.style}
                  quantity={product.quantity}
                  onQuantityChange={(qty) => {
                    if (qty != 0) {
                      dispatch({
                        type: "UPDATE_QTY",
                        payload: {
                          ...product,
                          quantity: qty,
                        },
                      });
                    }
                  }}
                  onRemove={() => {
                    dispatch({
                      type: "REMOVE_ITEM",
                      payload: {
                        productId: product.productId,
                      },
                    });
                  }}
                  key={index}
                ></CartItem>
              );
            })}
          </div>
        ) : (
          <div className="p-5 w-[80%] bg-gray-100 text-center ">
            <h1 className="bg-white p-5 h-[10vh] rounded-2xl flex justify-center items-center">
              Empty Cart...
            </h1>
          </div>
        )}

        {cartState.length > 0 && (
          <div className="p-5 bg-gray-100 w-[80%] flex flex-col">
            <CartSummary totalItems={totalItems} subtotal={subTotal} />

            <button
              className="mt-4 self-center bg-accent text-white py-2 rounded w-fit p-5 cursor-pointer hover:bg-green-600 transition-all duration-150 ease-in-out hover:scale-105 self-end"
              onClick={handleNext}
            >
              Proceed to Next Step
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
