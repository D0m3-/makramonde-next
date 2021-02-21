import { loadStripe } from '@stripe/stripe-js';
import { message } from 'antd';
import { Entry } from 'contentful';
import fetch from 'unfetch';
import { IUniqueProductFields } from '../../@types/generated/contentful';

const stripeLoad = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY as string);

export const checkout = async (products: Entry<IUniqueProductFields>[]) => {
  try {
    const response = await fetch('/api/checkout', {
      method: 'POST',
      body: JSON.stringify({
        products: products.map((product) => product.sys.id),
      }),
    });
    const data = await response.json();
    const stripe = await stripeLoad;
    if (!stripe) {
      throw new Error('Stripe did not load');
    }
    const result = await stripe.redirectToCheckout({
      sessionId: data.id,
    });
    console.log(result);
    if (result.error) {
      onError(result.error);
    }
    return result;
  } catch (error) {
    onError(error);
  }
};

const onError = (error) => {
  message.error(
    'Désolé, il y a eu un problème, veuillez réessayer plus tard...'
  );
  console.warn(error.message);
};
