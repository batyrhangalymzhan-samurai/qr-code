import { AnimatePresence, motion } from 'framer-motion';
import { ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext.jsx';
import { formatPrice } from '../lib/format.js';

export default function CartButton({ onClick }) {
  const { count, total } = useCart();

  return (
    <AnimatePresence>
      {count > 0 && (
        <motion.button
          key="cart-fab"
          type="button"
          onClick={onClick}
          initial={{ y: 120, opacity: 0, scale: 0.85 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 120, opacity: 0, scale: 0.85 }}
          transition={{ type: 'spring', damping: 22, stiffness: 260 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.95 }}
          aria-label={`Открыть корзину, ${count} шт.`}
          className="fixed inset-x-4 bottom-5 z-40 mx-auto flex max-w-md items-center justify-between rounded-full btn-grad px-5 py-4 font-semibold shadow-2xl shadow-red/40"
        >
          <span className="flex items-center gap-3">
            <span className="relative">
              <ShoppingBag size={22} />
              <motion.span
                key={count}
                initial={{ scale: 0.4 }}
                animate={{ scale: 1 }}
                className="absolute -right-2.5 -top-2 grid h-5 min-w-[20px] place-items-center rounded-full bg-cream px-1 text-[11px] font-bold text-ink"
              >
                {count}
              </motion.span>
            </span>
            Корзина
          </span>
          <span className="text-lg font-bold">{formatPrice(total)}</span>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
