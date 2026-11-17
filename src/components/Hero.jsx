import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import FoodImage from './FoodImage.jsx';
import { BRAND } from '../data/menu.js';

export default function Hero() {
  return (
    <header className="relative isolate flex min-h-[92svh] items-end overflow-hidden">
      <motion.div
        className="absolute inset-0 -z-10"
        initial={{ scale: 1.15, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <FoodImage src="/images/hero.svg" alt="Суши и пицца" className="h-full w-full object-cover" />
      </motion.div>
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-ink via-ink/70 to-ink/10" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-ink/80 to-transparent" />

      <div className="mx-auto w-full max-w-6xl px-5 pb-14 pt-32 sm:px-8">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25, duration: 0.7 }}>
          <p className="font-display text-6xl font-bold tracking-[0.25em] sm:text-8xl">{BRAND.name}</p>
          <p className="mt-2 text-xs font-semibold uppercase tracking-[0.5em] text-orange sm:text-sm">{BRAND.subtitle}</p>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.7 }}
          className="mt-8 max-w-2xl font-display text-3xl font-bold leading-tight sm:text-5xl"
        >
          Вкус, который вдохновляет
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 0.7 }}
          className="mt-4 max-w-xl text-base text-cream/75 sm:text-lg"
        >
          Любимые роллы, ароматная пицца и напитки — всё в одном меню.
        </motion.p>

        <motion.a
          href="#menu"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.7 }}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          className="mt-8 inline-flex items-center gap-2 rounded-full btn-grad px-7 py-4 font-bold shadow-xl shadow-red/30"
        >
          Смотреть меню
          <ArrowDown size={18} />
        </motion.a>
      </div>
    </header>
  );
}
