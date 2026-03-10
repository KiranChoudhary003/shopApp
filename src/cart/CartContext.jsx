import React, { createContext, useContext, useEffect, useMemo, useReducer } from "react";

const CartContext = createContext(null);

function safeJsonParse(raw, fallback) {
  try {
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function cartReducer(state, action) {
  switch (action.type) {
    case "ADD": {
      const p = action.product;
      const pid = p?._id || p?.id;
      if (!pid) return state;
      const existing = state.items.find((i) => i.id === pid);
      if (existing) {
        return {
          ...state,
          items: state.items.map((i) => (i.id === pid ? { ...i, qty: i.qty + (action.qty || 1) } : i)),
        };
      }
      return {
        ...state,
        items: [
          ...state.items,
          {
            id: pid,
            name: p.name || "Untitled product",
            price: Number(p.price) || 0,
            image: p.image || "",
            category: p.category || "",
            qty: action.qty || 1,
          },
        ],
      };
    }
    case "REMOVE":
      return { ...state, items: state.items.filter((i) => i.id !== action.id) };
    case "SET_QTY": {
      const qty = Math.max(1, Math.min(99, Number(action.qty) || 1));
      return { ...state, items: state.items.map((i) => (i.id === action.id ? { ...i, qty } : i)) };
    }
    case "CLEAR":
      return { ...state, items: [] };
    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, undefined, () => {
    const persisted = safeJsonParse(window.localStorage.getItem("cart"), { items: [] });
    return { items: Array.isArray(persisted?.items) ? persisted.items : [] };
  });

  useEffect(() => {
    window.localStorage.setItem("cart", JSON.stringify(state));
  }, [state]);

  const totals = useMemo(() => {
    const itemsCount = state.items.reduce((acc, i) => acc + (Number(i.qty) || 0), 0);
    const subtotal = state.items.reduce((acc, i) => acc + (Number(i.qty) || 0) * (Number(i.price) || 0), 0);
    return { itemsCount, subtotal };
  }, [state.items]);

  const value = useMemo(
    () => ({
      items: state.items,
      totals,
      add: (product, qty = 1) => dispatch({ type: "ADD", product, qty }),
      remove: (id) => dispatch({ type: "REMOVE", id }),
      setQty: (id, qty) => dispatch({ type: "SET_QTY", id, qty }),
      clear: () => dispatch({ type: "CLEAR" }),
    }),
    [state.items, totals]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}

