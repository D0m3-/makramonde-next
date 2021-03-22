import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { Button } from 'antd';
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
import { IMAGE_SIZES, REVALIDATE_INTERVAL } from '../src/util/constants';
import contentfulImageLoader from '../src/util/contentfulImageLoader';
import { getProductSlugFactory } from '../src/util/product';

type Props = {
  page: Entry<IPageFields>;
  layout: Layout;
};
const Home = ({ page, layout }: Props) => {
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
        {page.fields.content && documentToReactComponents(page.fields.content)}
        {layout.products.length ? (
          <>
            <p>Pour voir mes dernières créations, c'est par ici :</p>
            <div className={styles.explore}>
              <Button type="primary" size="large">
                <Link
                  href={getProductSlugFactory({ layout })(layout.products[0])}
                >
                  <a>Explorer</a>
                </Link>
              </Button>
            </div>
          </>
        ) : (
          <p>
            Je n'ai actuellement aucune création à vous proposer en ligne.
            Revenez bientôt pour voir mes nouveautés !
          </p>
        )}
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

export default Home;
