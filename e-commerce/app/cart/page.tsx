"use client";
import { CartItem } from "../components/CartItem";
import { CartProgressBar } from "../components/CartProgressBar";
import NavBar from "../components/NavBar";
import { useCart } from "../context/CartContext";

export default function Cart() {
  const { state: cartState, dispatch } = useCart();

  return (
    <div>
      <NavBar />
      <div className="w-full h-screen flex flex-col items-center justify-center gap-5">
        <div className="p-5 w-[80%] bg-gray-100">
          <CartProgressBar current="cart"></CartProgressBar>
        </div>

        {cartState.map((product, index) => {
          return (
            <div className="p-5 w-[80%] bg-gray-100">
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
              ></CartItem>
            </div>
          );
        })}
      </div>
    </div>
  );
}
