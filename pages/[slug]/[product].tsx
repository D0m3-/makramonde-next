import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { GetStaticPaths, GetStaticProps } from 'next';
import React from 'react';
import {
  fetchLayout,
  fetchProduct,
  fetchProductPages,
  fetchProducts,
} from '../../src/api/contentful';
import SiteLayout from '../../src/layout/layout';

const ProductPage = ({ product, layout }) => {
  return (
    <SiteLayout layout={layout}>
      {documentToReactComponents(product.fields.description)}
    </SiteLayout>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const [{ productPages }, { products }] = await Promise.all([
    fetchProductPages(),
    fetchProducts(),
  ]);
  const slugs = productPages.map((page) => page.fields.slug);
  const productIds = products.map((product) => product.sys.id);
  const paths = slugs.reduce<{ params: { slug: string; product: string } }[]>(
    (paths, slug) =>
      paths.concat(
        productIds.map((product) => ({
          params: {
            slug,
            product,
          },
        }))
      ),
    []
  );
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const [{ product }, layout] = await Promise.all([
    fetchProduct({ id: params?.product }),
    fetchLayout(),
  ]);

  return {
    props: { product, layout },
  };
};

export default ProductPage;
