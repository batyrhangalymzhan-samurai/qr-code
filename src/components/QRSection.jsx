import { useRef } from 'react';
import { motion } from 'framer-motion';
import { QRCodeCanvas } from 'qrcode.react';
import { Download } from 'lucide-react';

const PRINT_SIZE = 1200; // пикселей: достаточно для печати на листе А5/А4

export default function QRSection() {
  // Адрес берётся из текущего сайта: после публикации QR ведёт на реальный домен.
  const siteUrl = typeof window !== 'undefined' ? window.location.origin : '';
  const isLocal = /localhost|127\.0\.0\.1/.test(siteUrl);
  const printRef = useRef(null);

  const download = () => {
    const canvas = printRef.current;
    if (!canvas) return;
    const link = document.createElement('a');
    link.href = canvas.toDataURL('image/png');
    link.download = 'sora-menu-qr.png';
    link.click();
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="glass relative mt-16 flex flex-col items-center gap-8 overflow-hidden rounded-[2rem] p-6 sm:flex-row sm:p-10"
    >
      <div className="rounded-3xl bg-cream p-4 shadow-2xl">
        <QRCodeCanvas value={siteUrl} size={180} level="H" includeMargin fgColor="#111111" bgColor="#FFF8F0" />
      </div>

      <div className="text-center sm:text-left">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-orange">QR-меню для гостей</p>
        <h2 className="mt-2 font-display text-2xl font-bold sm:text-3xl">Откройте меню на телефоне</h2>
        <p className="mt-3 max-w-md text-cream/65">
          Наведите камеру на QR-код — меню откроется мгновенно. Скачайте код для печати и разместите на столиках.
        </p>
        <p className="mt-2 break-all text-sm text-cream/40">{siteUrl}</p>
        {isLocal && (
          <p className="mt-3 rounded-xl bg-orange/10 p-3 text-sm text-orange">
            Сейчас открыт локальный адрес. После публикации сайта QR-код будет вести на реальный адрес.
          </p>
        )}
        <motion.button
          type="button"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.96 }}
          onClick={download}
          className="mt-6 inline-flex items-center gap-2 rounded-full btn-grad px-6 py-3.5 font-bold shadow-lg shadow-red/30"
        >
          <Download size={18} />
          Скачать QR-код
        </motion.button>
      </div>

      {/* Скрытый холст большого размера для печати */}
      <div aria-hidden="true" className="pointer-events-none absolute -left-[9999px] top-0">
        <QRCodeCanvas
          ref={printRef}
          value={siteUrl}
          size={PRINT_SIZE}
          level="H"
          includeMargin
          fgColor="#111111"
          bgColor="#FFF8F0"
        />
      </div>
    </motion.section>
  );
}
