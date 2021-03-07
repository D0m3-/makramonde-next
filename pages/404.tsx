import Link from 'next/link';
import SEO from '../src/seo/SEO';

const NotFoundPage = () => (
  <>
    <SEO title="404: Introuvable" />
    <h1>Cette page n'existe pas</h1>
    <Link href="/">
      <a>Retourner à l'accueil</a>
    </Link>
  </>
);

export default NotFoundPage;
