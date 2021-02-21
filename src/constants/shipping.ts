export const FRANCE_METRO = 'france_metro';
export const OTHER = 'other';

export const SHIPPING = {
  [FRANCE_METRO]: {
    amount: 400,
    discountFrom: 5000,
    currency: 'eur',
    description: 'Livraison',
    descriptionDiscount: 'Livraison PROMO',
  },
  [OTHER]: {
    amount: 3000,

    discountFrom: 20000,
    currency: 'eur',
    description: 'Livraison en dehors de la France Metropolitaine',
    descriptionDiscount:
      'Livraison en dehors de la France Metropolitaine PROMO',
  },
};

export const SHIPPING_DISCOUNT_AMOUNT = 1;
