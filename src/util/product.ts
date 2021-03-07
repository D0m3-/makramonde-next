import { Entry } from 'contentful';
import {
  IPageFields,
  IUniqueProductFields,
} from '../../@types/generated/contentful';
import { fetchProductPages, fetchProducts } from '../api/contentful';
import Layout from '../layout/type/Layout';

export const getProductSlug = (product: Entry<IUniqueProductFields>) =>
  product.fields.slug || '';

export const getProductSlugFactory = ({ layout }: { layout: Layout }) => {
  const directory =
    ((layout.navBar.fields.links as unknown) as Entry<IPageFields>[])?.find(
      (link) => link.fields.tag == 'products'
    )?.fields.slug || 'produits';
  return (product: Entry<IUniqueProductFields>) =>
    `/${directory}/${getProductSlug(product)}`;
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
