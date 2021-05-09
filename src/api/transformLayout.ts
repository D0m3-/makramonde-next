import { Entry } from 'contentful';
import {
  ICategory,
  INavBarFields,
  IUniqueProductFields,
} from '../../@types/generated/contentful';
import Layout from '../layout/type/Layout';
import { getProductSlugFactory } from '../util/product';

export type LayoutContentful = {
  navBar: Entry<INavBarFields>;
  products: Entry<IUniqueProductFields>[];
};

const transformLayout = (layout: LayoutContentful): Layout => {
  const getProductSlug = getProductSlugFactory({ layout });
  return {
    navBar: {
      logo: {
        url: layout.navBar.fields.logo?.fields.file.url || null,
        description: layout.navBar.fields.logo?.fields.description || null,
      },
    },
    products: layout.products.map((product) => ({
      image: product.fields.images?.length
        ? {
            url: product.fields.images[0].fields.file.url,
            description: product.fields.images[0].fields.description || null,
          }
        : null,
      title: product.fields.title,
      slug: getProductSlug(product),
      id: product.sys.id,
    })),
    categories: layoutToCategories({ layout }),
    items: layoutToMenu({ layout }),
  };
};

export const layoutToMenu = ({ layout }: { layout: LayoutContentful }) => {
  return (
    layout.navBar.fields.links?.reduce<Layout['items']>((items, link) => {
      if (link.fields.tag == 'products') {
        return items.concat({
          type: 'products',
        });
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

const layoutToCategories = ({ layout }: { layout: LayoutContentful }) => {
  const categoryMap = layout.products.reduce<
    Record<string, Layout['categories'][number]>
  >((categories, product, index) => {
    const productCategories = product.fields.categories;
    (
      productCategories || [{ fields: { name: 'Autres' } } as ICategory]
    ).forEach((category) => {
      if (!category.fields.name) {
        return;
      }
      if (!categories[category.fields.name]) {
        categories[category.fields.name] = {
          title: category.fields.name,
          products: [],
        };
      }
      categories[category.fields.name].products.push(index);
    });
    return categories;
  }, {});
  return Object.values(categoryMap).sort((a, b) =>
    a.title.localeCompare(b.title)
  );
};

export default transformLayout;
