import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { PRODUCTS } from '../data/menu.js';

const STORAGE_KEY = 'sora-menu-cart-v1';
const CartContext = createContext(null);

function readStoredCart() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed)
      ? parsed.filter((l) => l && typeof l.id === 'string' && l.qty > 0)
      : [];
  } catch {
    return [];
  }
}

export function CartProvider({ children }) {
  const [lines, setLines] = useState(readStoredCart);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
    } catch {
      /* хранилище недоступно — корзина работает в памяти */
    }
  }, [lines]);

  const actions = useMemo(
    () => ({
      add: (id) =>
        setLines((prev) =>
          prev.some((l) => l.id === id)
            ? prev.map((l) => (l.id === id ? { ...l, qty: l.qty + 1 } : l))
            : [...prev, { id, qty: 1 }]
        ),
      dec: (id) =>
        setLines((prev) =>
          prev.map((l) => (l.id === id ? { ...l, qty: l.qty - 1 } : l)).filter((l) => l.qty > 0)
        ),
      remove: (id) => setLines((prev) => prev.filter((l) => l.id !== id)),
      clear: () => setLines([]),
    }),
    []
  );

  const items = useMemo(
    () =>
      lines
        .map((l) => ({ ...l, product: PRODUCTS.find((p) => p.id === l.id) }))
        .filter((i) => i.product),
    [lines]
  );

  const total = items.reduce((sum, i) => sum + i.product.price * i.qty, 0);
  const count = items.reduce((sum, i) => sum + i.qty, 0);
  const qtyOf = (id) => lines.find((l) => l.id === id)?.qty ?? 0;

  const value = { items, total, count, qtyOf, ...actions };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart должен использоваться внутри CartProvider');
  return ctx;
}
