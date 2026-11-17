// ============================================================
// ЕДИНЫЙ ФАЙЛ С ДАННЫМИ МЕНЮ
// Здесь меняются названия, описания, цены и фото блюд.
// Фото лежат в public/images/. Чтобы заменить фото, положите
// новый файл в public/images/ и укажите его имя в поле image.
// ============================================================

export const BRAND = {
  name: 'SORA',
  subtitle: 'Sushi & Pizza',
};

export const ORDER_CONFIG = {
  // Номер WhatsApp ресторана в формате 77001234567 (только цифры).
  // Пока поле пустое, заказ показывается только как демонстрация.
  whatsappNumber: '',
};

export const CATEGORIES = [
  { id: 'all', label: 'Все' },
  { id: 'rolls', label: 'Роллы' },
  { id: 'sets', label: 'Сеты' },
  { id: 'pizza', label: 'Пицца' },
  { id: 'snacks', label: 'Закуски' },
  { id: 'drinks', label: 'Напитки' },
];

export const PRODUCTS = [
  // Роллы
  { id: 'philadelphia', category: 'rolls', name: 'Филадельфия', description: 'Нежный лосось, сливочный сыр, огурец и нори.', price: 3200, image: '/images/philadelphia.svg' },
  { id: 'california', category: 'rolls', name: 'Калифорния', description: 'Краб, авокадо, огурец и икра масаго.', price: 2700, image: '/images/california.svg' },
  { id: 'tempura', category: 'rolls', name: 'Темпура ролл', description: 'Хрустящая темпура, угорь, соус унаги и кунжут.', price: 2900, image: '/images/tempura.svg' },
  { id: 'dragon', category: 'rolls', name: 'Дракон', description: 'Угорь, авокадо и тобико с тонкими ломтиками авокадо.', price: 3500, image: '/images/dragon.svg' },

  // Сеты
  { id: 'set-sora', category: 'sets', name: 'Сет SORA', description: 'Фирменное ассорти от шефа: роллы и нигири на 24 кусочка.', price: 8900, image: '/images/set-sora.svg' },
  { id: 'set-duo', category: 'sets', name: 'Сет Для двоих', description: 'Идеальный выбор на двоих: роллы, нигири и горячие роллы.', price: 6900, image: '/images/set-duo.svg' },
  { id: 'set-big', category: 'sets', name: 'Сет Большая компания', description: 'Ассорти на 6 персон: 48 кусочков трёх видов роллов.', price: 12900, image: '/images/set-big.svg' },

  // Пицца
  { id: 'margherita', category: 'pizza', name: 'Маргарита', description: 'Томатный соус, моцарелла, свежий базилик и оливковое масло.', price: 2900, image: '/images/margherita.svg' },
  { id: 'pepperoni', category: 'pizza', name: 'Пепперони', description: 'Острая салями пепперони и двойная порция моцареллы.', price: 3400, image: '/images/pepperoni.svg' },
  { id: 'four-cheese', category: 'pizza', name: 'Четыре сыра', description: 'Моцарелла, дор блю, пармезан и выдержанный чеддер.', price: 3800, image: '/images/four-cheese.svg' },
  { id: 'bbq-chicken', category: 'pizza', name: 'BBQ Chicken', description: 'Курица в соусе барбекю, красный лук и кукуруза.', price: 3900, image: '/images/bbq-chicken.svg' },

  // Закуски
  { id: 'fries', category: 'snacks', name: 'Картофель фри', description: 'Золотистый картофель с морской солью.', price: 1200, image: '/images/fries.svg' },
  { id: 'nuggets', category: 'snacks', name: 'Наггетсы', description: 'Хрустящие куриные наггетсы и соус на выбор.', price: 1800, image: '/images/nuggets.svg' },
  { id: 'cheese-sticks', category: 'snacks', name: 'Сырные палочки', description: 'Моцарелла в хрустящей панировке и соус маринара.', price: 1900, image: '/images/cheese-sticks.svg' },

  // Напитки
  { id: 'cola', category: 'drinks', name: 'Coca-Cola 0.5 л', description: 'Классическая кола в стекле со льдом.', price: 700, image: '/images/cola.svg' },
  { id: 'lemonade', category: 'drinks', name: 'Лимонад', description: 'Домашний лимонад с мятой и лаймом.', price: 1200, image: '/images/lemonade.svg' },
  { id: 'iced-tea', category: 'drinks', name: 'Айс-ти', description: 'Чай с персиком, лёд и свежая мята.', price: 900, image: '/images/iced-tea.svg' },
  { id: 'water', category: 'drinks', name: 'Вода', description: 'Негазированная вода 0.5 л.', price: 500, image: '/images/water.svg' },
];
