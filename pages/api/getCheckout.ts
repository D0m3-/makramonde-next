// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';
import { GAPurchase } from '../../src/util/tracking';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2020-08-27',
  typescript: true,
});

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { sessionId } = JSON.parse(req.body);
    if (!sessionId) {
      return res.status(404);
    }
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    if (!session) {
      return res.status(404);
    }
    if (session.payment_status !== 'paid') {
      console.warn({ session });
      return res.status(404);
    }
    const lineItemsResult = await stripe.checkout.sessions.listLineItems(
      sessionId,
      { limit: 100 }
    );
    if (lineItemsResult.has_more) {
      console.error('lineItems has_more', { sessionId });
      return res.status(500);
    }
    const purchaseEvent: GAPurchase = {
      transaction_id: (session.payment_intent as string) || undefined,
      value: (session.amount_total as number) / 100 || undefined,
      currency: session.currency || undefined,
      items: lineItemsResult.data.map((lineItem) => ({
        id: lineItem.id,
        name: lineItem.description,
        price: lineItem.amount_total / 100,
        quantity: lineItem.quantity || undefined,
      })),
    };
    return res.status(200).json({ purchaseEvent });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ err });
  }
};
