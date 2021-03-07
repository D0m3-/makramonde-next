import { documentToPlainTextString } from '@contentful/rich-text-plain-text-renderer';
import { Entry } from 'contentful';
import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import React from 'react';
import { IUniqueProductFields } from '../../@types/generated/contentful';
import {
  fetchLayout,
  fetchProductBySlug,
  fetchProductPages,
  fetchProducts,
} from '../../src/api/contentful';
import config from '../../src/config';
import SiteLayout from '../../src/layout/layout';
import Layout from '../../src/layout/type/Layout';
import Product from '../../src/product/Product';
import SEO from '../../src/seo/SEO';
import { formatPrice } from '../../src/util/price';
import { getProductSlug } from '../../src/util/product';

const ProductPage = ({
  product,
  layout,
}: {
  product: Entry<IUniqueProductFields>;
  layout: Layout;
}) => {
  const router = useRouter();
  const plainDescription = documentToPlainTextString(
    product.fields.description
  );
  return (
    <>
      <SEO
        title={product.fields.title}
        description={`${plainDescription} - Prix : ${formatPrice(
          product.fields.price,
          'EUR'
        )}`}
        image={
          (product.fields.images?.length &&
            product.fields.images[0].fields.file.url) ||
          undefined
        }
        jsonld={{
          '@type': 'Product',
          name: product.fields.title,
          image: product.fields.images?.map((image) => image.fields.file.url),
          description: plainDescription,
          sku: product.sys.id,
          brand: {
            '@type': 'Brand',
            name: 'Makramonde',
          },
          manufacturer: {
            name: 'Makramonde',
          },
          offers: {
            '@type': 'Offer',
            url: `${config.siteUrl}${router.asPath}`,
            priceCurrency: 'EUR',
            price: product.fields.price,
            itemCondition: 'https://schema.org/NewCondition',
            availability: 'https://schema.org/OnlineOnly',
            priceValidUntil: new Date(
              new Date().setFullYear(new Date().getFullYear() + 1)
            ).toISOString(),
          },
        }}
      ></SEO>
      <SiteLayout layout={layout} product={product}>
        <Product product={product} />
      </SiteLayout>
    </>
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
