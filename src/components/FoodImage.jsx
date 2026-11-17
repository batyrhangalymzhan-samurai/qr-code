import { useEffect, useState } from 'react';

const FALLBACK = '/images/placeholder.svg';

// Если файл блюда не найден, показываем запасное изображение, а не битую картинку.
export default function FoodImage({ src, alt, className = '', ...rest }) {
  const [current, setCurrent] = useState(src);

  useEffect(() => setCurrent(src), [src]);

  return (
    <img
      src={current}
      alt={alt}
      className={className}
      onError={() => {
        if (current !== FALLBACK) setCurrent(FALLBACK);
      }}
      {...rest}
    />
  );
}
