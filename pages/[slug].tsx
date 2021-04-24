import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { Card } from 'antd';
import { Entry } from 'contentful';
import { GetStaticPaths, GetStaticProps } from 'next';
import Link from 'next/link';
import React from 'react';
import { IPageFields } from '../@types/generated/contentful';
import {
  fetchBlogHome,
  fetchBlogPages,
  fetchContentPages,
  fetchLayout,
  fetchPage,
} from '../src/api/contentful';
import SiteLayout from '../src/layout/layout';
import Layout from '../src/layout/type/Layout';
import SEO from '../src/seo/SEO';
import { REVALIDATE_INTERVAL } from '../src/util/constants';

type Props = {
  page: Entry<IPageFields>;
  layout: Layout;
  extra: {
    blogPages?: Entry<IPageFields>[];
  };
};

const Page = ({ page, layout, extra }: Props) => {
  if (page.fields.tag === 'blog home') {
    return (
      <>
        <SEO title={page?.fields.title} />
        <SiteLayout layout={layout} page={page}>
          {page.fields.content &&
            documentToReactComponents(page.fields.content)}
          <br />
          {extra.blogPages?.map((blog) => (
            <Link href={`${page.fields.slug}/${blog.fields.slug}`}>
              <a>
                <Card>
                  <b>{blog.fields.title}</b>
                </Card>
              </a>
            </Link>
          ))}
        </SiteLayout>
      </>
    );
  }
  return (
    <>
      <SEO title={page?.fields.title} />
      <SiteLayout layout={layout} page={page}>
        {page.fields.content && documentToReactComponents(page.fields.content)}
      </SiteLayout>
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const { contentPages } = await fetchContentPages();
  const blogHomePage = await fetchBlogHome();
  const paths = contentPages.map((page) => ({
    params: { slug: page.fields.slug },
  }));
  if (blogHomePage) {
    paths.push({
      params: { slug: blogHomePage.fields.slug },
    });
  }
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const [{ page }, layout] = await Promise.all([
    fetchPage({ slug: params?.slug }),
    fetchLayout(),
  ]);
  const extra: Props['extra'] = {};

  if (page.fields.tag === 'blog home') {
    const { blogPages } = await fetchBlogPages();
    extra.blogPages = blogPages;
  }

  return {
    props: { page, layout, extra },
    revalidate: REVALIDATE_INTERVAL,
  };
};

export default Page;
