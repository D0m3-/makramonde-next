import { NextApiRequest, NextApiResponse } from 'next';
import {
  fetchContentPages,
  getAllProductSlugs,
} from '../../src/api/contentful';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const staticRoutes = [''];
  const [productSlugs, { contentPages }] = await Promise.all([
    getAllProductSlugs(),
    fetchContentPages(),
  ]);
  const contentSlugs = contentPages.map((page) => page.fields.slug);

  res.setHeader('Content-Type', 'text/xml');
  res.write(
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
  ${[...staticRoutes, ...contentSlugs, ...productSlugs]
    .map((route) => `<url><loc>${process.env.URL}/${route}</loc></url>`)
    .join('')}
</urlset>
    `
  );
  res.end();
};
