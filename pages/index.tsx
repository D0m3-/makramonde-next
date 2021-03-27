import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { Entry } from 'contentful';
import { GetStaticProps } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { IPageFields } from '../@types/generated/contentful';
import { fetchHome, fetchLayout } from '../src/api/contentful';
import config from '../src/config';
import styles from '../src/layout/index.module.less';
import SiteLayout from '../src/layout/layout';
import Layout from '../src/layout/type/Layout';
import SEO from '../src/seo/SEO';
import { THEME_VARIABLES } from '../src/util/configConstants';
import { IMAGE_SIZES, REVALIDATE_INTERVAL } from '../src/util/constants';
import contentfulImageLoader from '../src/util/contentfulImageLoader';
import { getProductSlugFactory } from '../src/util/product';

type Props = {
  page: Entry<IPageFields>;
  layout: Layout;
};
const Home = ({ page, layout }: Props) => {
  const getProductSlug = getProductSlugFactory({ layout });
  return (
    <>
      <SEO
        jsonld={{
          '@type': 'WebSite',
          url: config.siteUrl,
          inLanguage: 'fr',
          keywords:
            'macramé, ecommerce, bijou, unique, métal, art, pierres, création, atelier, makramonde',
          description: config.description,
          image: `${config.siteUrl}/images/makramonde-bijou.png`,
          name: config.title,
          alternateName: `Makramonde | Ecommerce macramé`,
        }}
      />
      <SiteLayout layout={layout} page={page}>
        {page.fields.assets?.length && (
          <h2>
            <Image
              src={page.fields.assets[0].fields.file.url}
              width="2048"
              height="1536"
              layout="responsive"
              sizes={IMAGE_SIZES}
              quality={90}
              alt={`${page.fields.assets[0].fields.description}`}
              loader={contentfulImageLoader}
              priority
            />
          </h2>
        )}
        <Products
          layout={layout}
          getProductSlug={getProductSlug}
          start={0}
          end={3}
        />

        {page.fields.content && (
          <div className={styles.content}>
            {documentToReactComponents(page.fields.content)}
          </div>
        )}
        <Products
          layout={layout}
          getProductSlug={getProductSlug}
          start={3}
          end={6}
        />
        {page.fields.assets && page.fields.assets.length > 1 && (
          <h2>
            <Image
              src={page.fields.assets[1].fields.file.url}
              width="2048"
              height="1536"
              layout="responsive"
              sizes={IMAGE_SIZES}
              alt={`${page.fields.assets[1].fields.description}`}
              loader={contentfulImageLoader}
            />
          </h2>
        )}
      </SiteLayout>
    </>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const [{ page }, layout] = await Promise.all([fetchHome(), fetchLayout()]);
  return {
    props: { page, layout },
    revalidate: REVALIDATE_INTERVAL,
  };
};

const PRODUCTS_IMAGE_SIZES = `(min-width: ${
  process.env.THEME_VARIABLES?.[THEME_VARIABLES.SCREEN_MD]
}) 15vw, 33vw`;

const Products = ({
  layout,
  start,
  end,
  getProductSlug,
}: {
  layout: Layout;
  start: number;
  end: number;
  getProductSlug: ReturnType<typeof getProductSlugFactory>;
}) => (
  <div className={styles.products}>
    {layout.products.slice(start, end).map((product) => {
      if (!product.fields.images || !product.fields.images.length) {
        return null;
      }
      const image = product.fields.images[0];
      return (
        <div key={getProductSlug(product)} className={styles.productContainer}>
          <Link href={getProductSlug(product)}>
            <a className={styles.product}>
              <Image
                src={image.fields.file.url}
                layout="fill"
                alt={`${image.fields.description}`}
                loader={contentfulImageLoader}
                objectFit="contain"
                priority
                sizes={PRODUCTS_IMAGE_SIZES}
              />
            </a>
          </Link>
        </div>
      );
    })}
  </div>
);

export default Home;
