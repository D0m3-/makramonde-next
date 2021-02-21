import { GetStaticProps } from 'next';
import Link from 'next/link';
import React from 'react';
import { fetchLayout } from '../src/api/contentful';
import SiteLayout from '../src/layout/layout';
import Layout from '../src/layout/type/Layout';

const SuccessPage = ({ layout }: { layout: Layout }) => (
  <SiteLayout layout={layout} pageTitle="Achat finalisé">
    <h1>Merci pour votre achat!</h1>
    <p>Vous allez bientôt recevoir un email de confirmation.</p>
    <Link href="/">Retour au site</Link>
  </SiteLayout>
);

export const getStaticProps: GetStaticProps = async (context) => {
  const layout = await fetchLayout();
  return {
    props: { layout },
  };
};

export default SuccessPage;
