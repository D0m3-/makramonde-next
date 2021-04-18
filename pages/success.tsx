import { GetStaticProps } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { fetchLayout } from '../src/api/contentful';
import { getCheckout } from '../src/api/stripe';
import SiteLayout from '../src/layout/layout';
import Layout from '../src/layout/type/Layout';
import SEO from '../src/seo/SEO';
import { REVALIDATE_INTERVAL } from '../src/util/constants';

const SuccessPage = ({ layout }: { layout: Layout }) => {
  const router = useRouter();
  const sessionId = router.query['session_id'];
  useEffect(() => {
    const processSuccess = async () => {
      if (sessionId) {
        const checkout = await getCheckout(sessionId as string);
        if (checkout) {
          gtag('event', 'purchase', checkout.purchaseEvent);
          console.log('event', 'purchase', checkout.purchaseEvent);
        }
      }
    };
    processSuccess();
  }, [sessionId]);
  return (
    <>
      <SEO title="Achat finalisé" />
      <SiteLayout layout={layout} pageTitle="Achat finalisé">
        <h1>Merci pour votre achat!</h1>
        <p>Vous allez bientôt recevoir un email de confirmation.</p>
        <Link href="/">
          <a>Retour au site</a>
        </Link>
      </SiteLayout>
    </>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const layout = await fetchLayout();
  return {
    props: { layout },
    revalidate: REVALIDATE_INTERVAL,
  };
};

export default SuccessPage;
