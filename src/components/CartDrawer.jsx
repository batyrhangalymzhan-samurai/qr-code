import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Info, Minus, Plus, Trash2, X } from 'lucide-react';
import { useCart } from '../context/CartContext.jsx';
import { formatPrice } from '../lib/format.js';
import { buildOrderText, buildWhatsAppUrl, isOrderingLive } from '../lib/order.js';
import FoodImage from './FoodImage.jsx';

export default function CartDrawer({ open, onClose }) {
  const { items, total, add, dec, remove, clear } = useCart();
  const [demoSummary, setDemoSummary] = useState(null);

  useEffect(() => {
    if (!open) setDemoSummary(null);
  }, [open]);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  const handleOrder = () => {
    const text = buildOrderText(items, total);
    if (isOrderingLive()) {
      window.open(buildWhatsAppUrl(text), '_blank', 'noopener');
      return;
    }
    setDemoSummary(text);
  };

  const handleClear = () => {
    clear();
    setDemoSummary(null);
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            key="backdrop"
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.aside
            key="sheet"
            role="dialog"
            aria-modal="true"
            aria-label="Корзина"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 32, stiffness: 320 }}
            className="fixed inset-x-0 bottom-0 z-50 mx-auto flex max-h-[88vh] w-full max-w-xl flex-col rounded-t-[2rem] border-t border-white/10 bg-[#1a1a1a] shadow-2xl"
          >
            <div className="flex items-center justify-between px-5 pb-4 pt-5">
              <h2 className="font-display text-xl font-bold">Ваш заказ</h2>
              <button
                type="button"
                onClick={onClose}
                aria-label="Закрыть корзину"
                className="grid h-11 w-11 place-items-center rounded-full bg-white/10 hover:bg-white/20"
              >
                <X size={20} />
              </button>
            </div>

            {items.length === 0 ? (
              <div className="px-5 pb-10 pt-6 text-center text-cream/60">
                <p className="text-lg">Корзина пока пуста</p>
                <p className="mt-1 text-sm">Добавьте любимые блюда из меню.</p>
              </div>
            ) : (
              <>
                <ul className="no-scrollbar flex-1 space-y-3 overflow-y-auto px-5 pb-4">
                  <AnimatePresence initial={false}>
                    {items.map(({ id, qty, product }) => (
                      <motion.li
                        key={id}
                        layout
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 40 }}
                        className="flex items-center gap-3 rounded-2xl bg-white/[0.05] p-3"
                      >
                        <FoodImage src={product.image} alt="" className="h-16 w-16 shrink-0 rounded-xl object-cover" />
                        <div className="min-w-0 flex-1">
                          <p className="truncate font-semibold">{product.name}</p>
                          <p className="text-sm font-semibold text-orange">{formatPrice(product.price * qty)}</p>
                        </div>
                        <div className="flex items-center gap-1 rounded-full bg-white/10 p-1">
                          <button
                            type="button"
                            onClick={() => dec(id)}
                            aria-label={`Уменьшить количество: ${product.name}`}
                            className="grid h-9 w-9 place-items-center rounded-full active:scale-90 hover:bg-white/10"
                          >
                            <Minus size={16} />
                          </button>
                          <span className="w-6 text-center font-bold">{qty}</span>
                          <button
                            type="button"
                            onClick={() => add(id)}
                            aria-label={`Увеличить количество: ${product.name}`}
                            className="grid h-9 w-9 place-items-center rounded-full active:scale-90 hover:bg-white/10"
                          >
                            <Plus size={16} />
                          </button>
                        </div>
                        <button
                          type="button"
                          onClick={() => remove(id)}
                          aria-label={`Удалить ${product.name}`}
                          className="grid h-9 w-9 place-items-center rounded-full text-cream/50 hover:text-red"
                        >
                          <Trash2 size={18} />
                        </button>
                      </motion.li>
                    ))}
                  </AnimatePresence>
                </ul>

                <div className="space-y-4 border-t border-white/10 px-5 pb-6 pt-4">
                  <div className="flex items-center justify-between">
                    <span className="text-cream/70">Итого</span>
                    <span className="font-display text-2xl font-bold text-orange">{formatPrice(total)}</span>
                  </div>

                  <AnimatePresence>
                    {demoSummary && (
                      <motion.div
                        key="demo"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="rounded-2xl border border-orange/30 bg-orange/10 p-4 text-sm">
                          <p className="mb-2 flex items-start gap-2 font-semibold text-orange">
                            <Info size={16} className="mt-0.5 shrink-0" />
                            Это демонстрационная версия. Реальные заказы не принимаются.
                          </p>
                          <pre className="whitespace-pre-wrap font-sans text-cream/80">{demoSummary}</pre>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <motion.button
                    type="button"
                    whileTap={{ scale: 0.97 }}
                    onClick={handleOrder}
                    className="w-full rounded-full btn-grad py-4 text-lg font-bold shadow-lg shadow-red/30"
                  >
                    Оформить заказ
                  </motion.button>
                  <button type="button" onClick={handleClear} className="w-full text-center text-sm text-cream/50 hover:text-cream">
                    Очистить корзину
                  </button>
                </div>
              </>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
