import { GetStaticProps } from 'next';
import Link from 'next/link';
import { fetchLayout } from '../src/api/contentful';
import SiteLayout from '../src/layout/layout';
import Layout from '../src/layout/type/Layout';
import SEO from '../src/seo/SEO';
import { REVALIDATE_INTERVAL } from '../src/util/constants';

const NotFoundPage = ({ layout }: { layout: Layout }) => (
  <>
    <SEO title="404: Introuvable" />
    <SiteLayout layout={layout} pageTitle="Oups !">
      <h1>Cette page n'existe pas</h1>
      <Link href="/">
        <a>Retourner à l'accueil</a>
      </Link>
    </SiteLayout>
  </>
);

export const getStaticProps: GetStaticProps = async (context) => {
  const layout = await fetchLayout();
  return {
    props: { layout },
    revalidate: REVALIDATE_INTERVAL,
  };
};

export default NotFoundPage;
