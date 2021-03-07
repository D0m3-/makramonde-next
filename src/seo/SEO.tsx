import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { MetaHTMLAttributes } from 'react';
import config from '../config';

type SeoProps = {
  description?: string;
  meta?: MetaHTMLAttributes<HTMLMetaElement>[];
  title?: string;
  image?: string;
  jsonld?: Record<string, unknown>;
};

const SEO = ({ description, meta, title, image, jsonld }: SeoProps) => {
  const pageTitle = (title && `${title} | Makramonde`) || config.title;
  const metaDescription = description || config.description;
  const metaImage = image || `${config.siteUrl}/images/makramonde-bijou.png`;
  const router = useRouter();

  return (
    <Head>
      <title>{pageTitle}</title>
      <meta name="description" content={metaDescription} />
      <meta property="og:url" content={`${config.siteUrl}${router.asPath}`} />
      <meta property="og:site_name" content={pageTitle} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:image" content={metaImage} itemProp="image" />
      {metaImage && metaImage.startsWith('https') && (
        <meta
          property="og:image:secure_url"
          content={metaImage}
          itemProp="image"
        />
      )}
      <meta property="twitter:card" content="summary" />
      <meta property="twitter:creator" content={config.author} />
      <meta property="twitter:title" content={pageTitle} />
      <meta property="twitter:description" content={metaDescription} />
      {meta?.map((props) => (
        <meta {...props} />
      ))}

      <link rel="canonical" href={`${config.siteUrl}${router.asPath}`} />
      {jsonld && (
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'http://schema.org',
            ...jsonld,
          })}
        </script>
      )}
    </Head>
  );
};

export default SEO;
