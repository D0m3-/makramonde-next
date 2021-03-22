import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { GetStaticPaths, GetStaticProps } from 'next';
import React from 'react';
import {
  fetchContentPages,
  fetchLayout,
  fetchPage,
} from '../src/api/contentful';
import SiteLayout from '../src/layout/layout';
import SEO from '../src/seo/SEO';
import { REVALIDATE_INTERVAL } from '../src/util/constants';

const Page = ({ page, layout }) => {
  return (
    <>
      <SEO title={page?.fields.title} />
      <SiteLayout layout={layout} page={page}>
        {documentToReactComponents(page.fields.content)}
      </SiteLayout>
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const { contentPages } = await fetchContentPages();
  const paths = contentPages.map((page) => ({
    params: { slug: page.fields.slug },
  }));
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const [{ page }, layout] = await Promise.all([
    fetchPage({ slug: params?.slug }),
    fetchLayout(),
  ]);

  return {
    props: { page, layout },
    revalidate: REVALIDATE_INTERVAL,
  };
};

export default Page;
