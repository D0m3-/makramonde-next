import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { Entry } from 'contentful';
import { GetStaticProps } from 'next';
import React from 'react';
import { IPageFields } from '../@types/generated/contentful';
import { fetchHome, fetchLayout } from '../src/api/contentful';
import SiteLayout from '../src/layout/layout';
import Layout from '../src/layout/type/Layout';

type Props = {
  page: Entry<IPageFields>;
  layout: Layout;
};

const Home = ({ page, layout }: Props) => {
  return (
    <SiteLayout layout={layout} page={page}>
      {page.fields.content && documentToReactComponents(page.fields.content)}
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
