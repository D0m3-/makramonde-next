exports.FRANCE_METRO = 'france_metro'
exports.OTHER = 'other'

exports.SHIPPING = {
  [this.FRANCE_METRO]: {
    amount: 400,
    discountFrom: 5000,
    currency: 'eur',
    description: 'Livraison',
    descriptionDiscount: 'Livraison PROMO'
  },
  [this.OTHER]: {
    amount: 3000,

    discountFrom: 20000,
    currency: 'eur',
    description: 'Livraison en dehors de la France Metropolitaine',
    descriptionDiscount: 'Livraison en dehors de la France Metropolitaine PROMO'
  }
}

exports.SHIPPING_DISCOUNT_AMOUNT = 1
