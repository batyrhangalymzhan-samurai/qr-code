import { Search, X } from 'lucide-react';

export default function SearchBar({ value, onChange }) {
  return (
    <label className="glass flex items-center gap-3 rounded-full px-4 py-3 transition focus-within:border-orange/50">
      <Search size={18} className="shrink-0 text-cream/50" aria-hidden="true" />
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Найти любимое блюдо..."
        aria-label="Поиск блюд"
        className="w-full bg-transparent text-base outline-none placeholder:text-cream/40"
      />
      {value && (
        <button type="button" onClick={() => onChange('')} aria-label="Очистить поиск" className="text-cream/60 hover:text-cream">
          <X size={18} />
        </button>
      )}
    </label>
  );
}
