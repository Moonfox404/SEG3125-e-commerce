"use client";

import { createContext, useContext, useReducer, useEffect } from "react";

type CartItem = {
  productId: string;
  quantity: number;
  style: string | number;
};

type CartState = CartItem[];
type CartAction =
  | { type: "HYDRATE"; payload: CartItem[] }
  | { type: "ADD_ITEM"; payload: CartItem }
  | { type: "REMOVE_ITEM"; payload: { productId: string } }
  | { type: "UPDATE_QTY"; payload: CartItem };

const CartContext = createContext<{
  state: CartState;
  dispatch: React.Dispatch<CartAction>;
}>({ state: [], dispatch: () => null });

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "HYDRATE":
      return action.payload;
    case "ADD_ITEM": {
      const existing = state.find(
        (i) => i.productId === action.payload.productId
      );
      if (existing) {
        return state.map((i) =>
          i.productId === action.payload.productId
            ? { ...i, quantity: i.quantity + action.payload.quantity }
            : i
        );
      }
      return [...state, action.payload];
    }
    case "UPDATE_QTY":
      return state.map((i) =>
        i.productId === action.payload.productId
          ? { ...i, quantity: action.payload.quantity }
          : i
      );
    case "REMOVE_ITEM":
      return state.filter((i) => i.productId !== action.payload.productId);
    default:
      return state;
  }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, []);

  // On mount, load from localStorage
  useEffect(() => {
    try {
      const stored = window.localStorage.getItem("cart");
      if (stored) {
        dispatch({ type: "HYDRATE", payload: JSON.parse(stored) });
      }
    } catch (e) {
      console.warn("Failed to hydrate cart", e);
    }
  }, []);

  // Whenever cart state changes, also update local storage
  useEffect(() => {
    window.localStorage.setItem("cart", JSON.stringify(state));
  }, [state]);

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
