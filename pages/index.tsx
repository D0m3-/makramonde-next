import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { GetStaticProps } from 'next';
import React from 'react';
import { fetchHome } from '../src/api/contentful';
import SiteLayout from '../src/layout/layout';

const Home = ({ content }) => {
  return <SiteLayout>{documentToReactComponents(content)}</SiteLayout>;
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { page } = await fetchHome();
  return { props: { content: page.fields.content } };
};

export default Home;
