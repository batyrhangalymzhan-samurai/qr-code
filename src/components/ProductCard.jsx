import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Check, Plus } from 'lucide-react';
import FoodImage from './FoodImage.jsx';
import { useCart } from '../context/CartContext.jsx';
import { formatPrice } from '../lib/format.js';

export default function ProductCard({ product, index = 0 }) {
  const { add, qtyOf } = useCart();
  const [justAdded, setJustAdded] = useState(false);
  const timer = useRef(null);
  const qty = qtyOf(product.id);

  useEffect(() => () => clearTimeout(timer.current), []);

  const handleAdd = () => {
    add(product.id);
    setJustAdded(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setJustAdded(false), 900);
  };

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.92 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.45, delay: Math.min(index * 0.04, 0.25) }}
      whileHover={{ y: -4 }}
      className="glass flex flex-col overflow-hidden rounded-3xl"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-white/5">
        <motion.div className="h-full w-full" whileHover={{ scale: 1.07 }} transition={{ duration: 0.6, ease: 'easeOut' }}>
          <FoodImage src={product.image} alt={product.name} loading="lazy" className="h-full w-full object-cover" />
        </motion.div>
        <AnimatePresence>
          {qty > 0 && (
            <motion.span
              key="qty"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              className="absolute right-2.5 top-2.5 grid h-7 min-w-[28px] place-items-center rounded-full bg-cream px-2 text-xs font-bold text-ink shadow-lg"
            >
              {qty}
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      <div className="flex flex-1 flex-col p-3.5 sm:p-5">
        <h3 className="font-display text-[15px] font-semibold leading-snug sm:text-xl">{product.name}</h3>
        <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-cream/60 sm:text-sm">{product.description}</p>

        <div className="mt-auto flex items-center justify-between gap-2 pt-4">
          <span className="whitespace-nowrap text-lg font-bold text-orange sm:text-2xl">{formatPrice(product.price)}</span>
          <motion.button
            type="button"
            whileTap={{ scale: 0.88 }}
            onClick={handleAdd}
            aria-label={`Добавить ${product.name} в корзину`}
            className={`relative grid h-11 min-w-[44px] place-items-center overflow-hidden rounded-full px-3 text-white shadow-lg shadow-red/25 transition-colors ${
              justAdded ? 'bg-emerald-600' : 'btn-grad'
            }`}
          >
            <AnimatePresence mode="wait" initial={false}>
              {justAdded ? (
                <motion.span
                  key="ok"
                  initial={{ y: 12, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -12, opacity: 0 }}
                  className="flex items-center gap-1 whitespace-nowrap text-sm font-semibold"
                >
                  <Check size={18} /> Добавлено
                </motion.span>
              ) : (
                <motion.span
                  key="add"
                  initial={{ y: -12, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 12, opacity: 0 }}
                >
                  <Plus size={22} />
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </div>
    </motion.article>
  );
}
