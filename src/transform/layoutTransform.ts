import { Entry } from 'contentful';
import {
  ICategory,
  IPageFields,
  IUniqueProductFields,
} from '../../@types/generated/contentful';
import Layout from '../layout/type/Layout';

export const layoutProductsToCategories = ({
  layout,
  search,
}: {
  layout: Layout;
  search: string;
}) => {
  return layout.products.reduce((categories, product) => {
    const productCategories = product.fields.categories;
    (
      productCategories || [{ fields: { name: 'Autres' } } as ICategory]
    ).forEach((category) => {
      if (!category.fields.name) {
        return;
      }
      categories[category.fields.name] = (
        categories[category.fields.name] || []
      ).concat(product);
    });
    return categories;
  }, {} as Record<string, Entry<IUniqueProductFields>[]>);
};

export const layoutToMenu = ({ layout }: { layout: Layout }) => {
  const productSlug =
    ((layout.navBar.fields.links as unknown) as Entry<IPageFields>[])?.find(
      (link) => link.fields.tag == 'products'
    )?.fields.slug || 'produits';
  return (
    layout.navBar.fields.links?.reduce<
      { slug: string; title?: string; type: 'link' | 'products' }[]
    >((items, link) => {
      if (link.fields.tag == 'products') {
        return items.concat({ slug: productSlug, type: 'products' });
      }
      return items.concat([
        {
          slug: link.fields.slug as string,
          title: link.fields.title as string,
          type: 'link',
        },
      ]);
    }, []) || []
  );
};
