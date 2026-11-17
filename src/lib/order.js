import { ORDER_CONFIG } from '../data/menu.js';
import { formatPrice } from './format.js';

// Заказ уходит в WhatsApp, только если в data/menu.js указан номер.
export const isOrderingLive = () => Boolean(ORDER_CONFIG.whatsappNumber);

export function buildOrderText(items, total) {
  const lines = items.map(
    (i) => `• ${i.product.name} × ${i.qty} — ${formatPrice(i.product.price * i.qty)}`
  );
  return ['Новый заказ из меню SORA:', ...lines, `Итого: ${formatPrice(total)}`].join('\n');
}

export function buildWhatsAppUrl(text) {
  return `https://wa.me/${ORDER_CONFIG.whatsappNumber}?text=${encodeURIComponent(text)}`;
}
