import { Entry } from 'contentful';
import React, { createContext, useState } from 'react';
import { IUniqueProductFields } from '../../@types/generated/contentful';

export const CartContext = createContext({
  items: [] as Entry<IUniqueProductFields>[],
  empty: () => {},
  addItem: (item: Entry<IUniqueProductFields>) => {},
});

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(
    new Set<Entry<IUniqueProductFields>>()
  );
  return (
    <CartContext.Provider
      value={{
        // @ts-expect-error Set is not iterable
        items: [...cartItems],
        // @ts-expect-error Set is not iterable
        addItem: (item) => setCartItems(new Set([...cartItems, item])),
        empty: () => setCartItems(new Set()),
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
