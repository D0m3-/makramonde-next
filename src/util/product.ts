import { Entry } from 'contentful';
import {
  IPageFields,
  IUniqueProductFields,
} from '../../@types/generated/contentful';
import { LayoutContentful } from '../api/transformLayout';

export const getProductSlug = (product: Entry<IUniqueProductFields>) =>
  product.fields.slug || '';

export const getProductSlugFactory = ({
  layout,
}: {
  layout: LayoutContentful;
}) => {
  const directory =
    ((layout.navBar.fields.links as unknown) as Entry<IPageFields>[])?.find(
      (link) => link.fields.tag == 'products'
    )?.fields.slug || 'produits';
  return (product: Entry<IUniqueProductFields>) =>
    `/${directory}/${getProductSlug(product)}`;
};
