import { createClient } from 'contentful';
import {
  INavBarFields,
  IPageFields,
  IUniqueProductFields,
} from '../../@types/generated/contentful';
import { getProductSlug } from '../util/product';
import transformLayout from './transformLayout';

const environment =
  process.env.NEXT_PUBLIC_STRIPE_ENV === 'test' ? 'test' : 'master';
const accessToken = process.env.CONTENTFUL_ACCESS_TOKEN;
const client = createClient({
  space: 'lqbvqzcpaex7',
  accessToken: accessToken as string,
  environment,
});

export const fetchHome = async () => fetchPage({ slug: '/' });

export const fetchContentPages = async () => {
  const entries = await client.getEntries<IPageFields>({
    content_type: 'page',
    'fields.tag': 'content',
  });
  return { contentPages: entries.items };
};

export const fetchBlogHome = async () => {
  const entries = await client.getEntries<IPageFields>({
    content_type: 'page',
    'fields.tag': 'blog home',
  });
  if (!entries.items.length) {
    return;
  }
  return entries.items[0];
};

export const fetchBlogPages = async () => {
  const entries = await client.getEntries<IPageFields>({
    content_type: 'page',
    'fields.tag': 'blog',
  });
  return { blogPages: entries.items };
};

export const fetchProductPages = async () => {
  const entries = await client.getEntries<IPageFields>({
    content_type: 'page',
    'fields.tag': 'products',
  });
  return { productPages: entries.items };
};

export const fetchPage = async ({ slug }) => {
  const entries = await client.getEntries<IPageFields>({
    content_type: 'page',
    'fields.slug': slug,
  });
  return { page: entries.items[0] };
};

export const fetchLayout = async () => {
  const [entries, { products }] = await Promise.all([
    client.getEntries<INavBarFields>({
      content_type: 'navBar',
    }),
    fetchProducts(),
  ]);
  return transformLayout({ navBar: entries.items[0], products });
};

export const fetchProducts = async () => {
  const entries = await client.getEntries<IUniqueProductFields>({
    content_type: 'uniqueProduct',
  });
  return { products: entries.items };
};

export const fetchProduct = async ({ id }) => {
  const entry = await client.getEntry<IUniqueProductFields>(id);
  return { product: entry };
};

export const fetchProductBySlug = async ({ slug }) => {
  const entries = await client.getEntries<IUniqueProductFields>({
    content_type: 'uniqueProduct',
    'fields.slug': slug,
  });
  return { product: entries.items[0] };
};

export const getAllProductSlugs = async () => {
  const [{ productPages }, { products }] = await Promise.all([
    fetchProductPages(),
    fetchProducts(),
  ]);
  const pageSlugs = productPages.map((page) => page.fields.slug);
  const productSlugs = products.map(getProductSlug);
  return pageSlugs.reduce<string[]>(
    (slugs, pageSlug) =>
      slugs.concat(productSlugs.map((slug) => `${pageSlug}/${slug}`)),
    []
  );
};
