import { useCallback, useMemo, useState } from 'react';
import { AnimatePresence, MotionConfig, motion } from 'framer-motion';
import { PRODUCTS } from './data/menu.js';
import { CartProvider } from './context/CartContext.jsx';
import Hero from './components/Hero.jsx';
import CategoryNav from './components/CategoryNav.jsx';
import SearchBar from './components/SearchBar.jsx';
import ProductCard from './components/ProductCard.jsx';
import CartButton from './components/CartButton.jsx';
import CartDrawer from './components/CartDrawer.jsx';
import QRSection from './components/QRSection.jsx';
import Footer from './components/Footer.jsx';

export default function App() {
  const [category, setCategory] = useState('all');
  const [query, setQuery] = useState('');
  const [cartOpen, setCartOpen] = useState(false);
  const closeCart = useCallback(() => setCartOpen(false), []);

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return PRODUCTS.filter(
      (p) =>
        (category === 'all' || p.category === category) &&
        p.name.toLowerCase().includes(q)
    );
  }, [category, query]);

  return (
    <MotionConfig reducedMotion="user">
      <CartProvider>
        <div className="min-h-screen overflow-x-hidden bg-ink text-cream">
          <Hero />

          <section id="menu">
            <div className="sticky top-0 z-30 border-b border-white/5 bg-ink/85 pt-3 backdrop-blur-xl">
              <div className="mx-auto max-w-6xl px-4">
                <SearchBar value={query} onChange={setQuery} />
              </div>
              <div className="mx-auto max-w-6xl">
                <CategoryNav active={category} onChange={setCategory} />
              </div>
            </div>

            <div className="mx-auto max-w-6xl px-4 pb-32 pt-5">
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mb-5 flex items-center gap-2 text-xs text-cream/50 sm:text-sm"
              >
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-red" />
                Демонстрационное меню. Блюда и цены приведены для примера.
              </motion.p>

              <motion.div layout className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-3">
                <AnimatePresence mode="popLayout">
                  {visible.map((product, i) => (
                    <ProductCard key={product.id} product={product} index={i} />
                  ))}
                </AnimatePresence>
              </motion.div>

              {visible.length === 0 && (
                <p className="py-16 text-center text-cream/50">Ничего не найдено. Попробуйте другой запрос.</p>
              )}

              <QRSection />
            </div>
          </section>

          <Footer />
          <CartButton onClick={() => setCartOpen(true)} />
          <CartDrawer open={cartOpen} onClose={closeCart} />
        </div>
      </CartProvider>
    </MotionConfig>
  );
}
