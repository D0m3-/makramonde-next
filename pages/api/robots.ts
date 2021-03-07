import { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const content = `User-agent: *
Allow: /
Sitemap: ${process.env.URL}/sitemap.xml
Host: ${process.env.URL}
  `;
  res.setHeader('Content-Type', 'text/plain; charset=UTF-8');
  // write the sitemap
  res.write(content);
  res.end();
};
