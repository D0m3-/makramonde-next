const contentful = require('contentful');

const environment = process.env.STRIPE_ENV === 'test' ? 'test' : 'master';
const accessToken = process.env.CONTENTFUL_ACCESS_TOKEN;

const client = contentful.createClient({
  space: 'lqbvqzcpaex7',
  accessToken: accessToken as string,
  environment,
});

export const fetchHome = async () => {
  const entries = await client.getEntries({
    content_type: 'page',
    'fields.slug': '/',
  });
  return { page: entries.items[0] };
};

export const fetchNavBar = async () => {
  const entries = await client.getEntries({
    content_type: 'navBar',
  });
  return { navBar: entries.items[0] };
};
