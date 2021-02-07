import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { GetStaticProps } from 'next';
import React from 'react';
import { fetchHome, fetchLayout } from '../src/api/contentful';
import SiteLayout from '../src/layout/layout';

const Home = ({ page, layout }) => {
  return (
    <SiteLayout layout={layout} page={page}>
      {documentToReactComponents(page.fields.content)}
    </SiteLayout>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const [{ page }, layout] = await Promise.all([fetchHome(), fetchLayout()]);
  return {
    props: { page, layout },
  };
};

export default Home;
