import { Entry } from 'contentful';
import { GetStaticPaths, GetStaticProps } from 'next';
import React from 'react';
import { IUniqueProductFields } from '../../@types/generated/contentful';
import {
  fetchLayout,
  fetchProductBySlug,
  fetchProductPages,
  fetchProducts,
} from '../../src/api/contentful';
import SiteLayout from '../../src/layout/layout';
import Layout from '../../src/layout/type/Layout';
import Product from '../../src/Product';
import { getProductSlug } from '../../src/util/product';

const ProductPage = ({
  product,
  layout,
}: {
  product: Entry<IUniqueProductFields>;
  layout: Layout;
}) => {
  return (
    <SiteLayout layout={layout} product={product}>
      <Product product={product} />
    </SiteLayout>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const [{ productPages }, { products }] = await Promise.all([
    fetchProductPages(),
    fetchProducts(),
  ]);
  const slugs = productPages.map((page) => page.fields.slug);
  const productSlugs = products.map(getProductSlug);
  const paths = slugs.reduce<{ params: { slug: string; product: string } }[]>(
    (paths, slug) =>
      paths.concat(
        productSlugs.map((product) => ({
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
    fetchProductBySlug({ slug: params?.product }),
    fetchLayout(),
  ]);

  return {
    props: { product, layout },
  };
};

export default ProductPage;
