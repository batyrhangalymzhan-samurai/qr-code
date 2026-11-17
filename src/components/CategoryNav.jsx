import { motion } from 'framer-motion';
import { CATEGORIES } from '../data/menu.js';

export default function CategoryNav({ active, onChange }) {
  return (
    <nav className="no-scrollbar flex gap-2 overflow-x-auto px-4 pb-3" aria-label="Категории меню">
      {CATEGORIES.map((c) => {
        const isActive = c.id === active;
        return (
          <button
            key={c.id}
            type="button"
            onClick={() => onChange(c.id)}
            aria-pressed={isActive}
            className={`relative shrink-0 rounded-full px-5 py-2.5 text-sm font-semibold transition-colors ${
              isActive ? 'text-ink' : 'text-cream/70 hover:text-cream'
            }`}
          >
            {isActive && (
              <motion.span
                layoutId="category-pill"
                className="absolute inset-0 rounded-full bg-cream"
                transition={{ type: 'spring', stiffness: 500, damping: 38 }}
              />
            )}
            <span className="relative">{c.label}</span>
          </button>
        );
      })}
    </nav>
  );
}
