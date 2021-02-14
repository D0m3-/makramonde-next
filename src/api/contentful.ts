import { createClient } from 'contentful';
import {
  INavBar,
  IPage,
  IUniqueProduct,
} from '../../@types/generated/contentful';

const environment = process.env.STRIPE_ENV === 'test' ? 'test' : 'master';
const accessToken = process.env.CONTENTFUL_ACCESS_TOKEN;

const client = createClient({
  space: 'lqbvqzcpaex7',
  accessToken: accessToken as string,
  environment,
});

export const fetchHome = async () => fetchPage({ slug: '/' });

export const fetchContentPages = async () => {
  const entries = await client.getEntries<IPage>({
    content_type: 'page',
    'fields.tag': 'content',
  });
  return { contentPages: entries.items };
};

export const fetchProductPages = async () => {
  const entries = await client.getEntries<IPage>({
    content_type: 'page',
    'fields.tag': 'products',
  });
  return { productPages: entries.items };
};

export const fetchPage = async ({ slug }) => {
  const entries = await client.getEntries<IPage>({
    content_type: 'page',
    'fields.slug': slug,
  });
  return { page: entries.items[0] };
};

export const fetchLayout = async () => {
  const [entries, { products }] = await Promise.all([
    client.getEntries<INavBar>({
      content_type: 'navBar',
    }),
    fetchProducts(),
  ]);
  return { navBar: entries.items[0], products };
};

export const fetchProducts = async () => {
  const entries = await client.getEntries<IUniqueProduct>({
    content_type: 'uniqueProduct',
  });
  return { products: entries.items };
};

export const fetchProduct = async ({ id }) => {
  const entry = await client.getEntry<IUniqueProduct>(id);
  return { product: entry };
};
