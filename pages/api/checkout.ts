// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';
import { fetchProduct } from '../../src/api/contentful';
import { FRANCE_METRO, SHIPPING } from '../../src/constants/shipping';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2020-08-27',
  typescript: true,
});

type Sku = {
  name: string;
  amount: number;
  currency: string;
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { products } = JSON.parse(req.body);
    const promises: Promise<Sku>[] = products.map(async (id: string) => {
      const { product } = await fetchProduct({ id });
      return {
        name: product.fields.title,
        amount: product.fields.price * 100,
        currency: 'EUR',
      };
    });
    const skus = await Promise.all(promises);
    const data = await createCheckout({
      skus,
      origin: req.headers.origin,
      referer: req.headers.referer,
    });
    return res.status(200).json({ id: data.id });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ err });
  }
};

async function createCheckout({
  skus,
  origin,
  referer,
}: {
  skus: Sku[];
  origin?: string;
  referer?: string;
}) {
  const items = skus.map((sku) => ({
    ...sku,
    quantity: 1,
  }));

  // Add shipping line
  const totalAmount = skus.reduce((total, sku) => total + sku.amount, 0);
  const shipping = SHIPPING[FRANCE_METRO];
  const isDiscount = totalAmount >= shipping.discountFrom;
  items.push({
    name: (isDiscount && shipping.descriptionDiscount) || shipping.description,
    amount: (isDiscount && 1) || shipping.amount,
    currency: shipping.currency,
    quantity: 1,
  });
  // create a session
  const session = await stripe.checkout.sessions.create({
    success_url: `${origin}/success/`,
    cancel_url: referer || '',
    payment_method_types: ['card'],
    line_items: items,
    shipping_address_collection: {
      allowed_countries: ['FR'],
    },
  });
  return session;
}
