import { TagsOutlined } from '@ant-design/icons';
import { Input, Menu as AntdMenu } from 'antd';
import Link from 'next/link';
import React, { useState } from 'react';
import styles from './menu.module.less';

const { SubMenu } = AntdMenu;

const getProductUrl = (product) => product.sys.id;

const Menu = ({ layout, slug, onSelect }) => {
  const [search, setSearch] = useState('');
  const autres = [];
  const categories = layout.products?.reduce((categories, product) => {
    if (
      search.length &&
      !product.fields.title.toLowerCase().includes(search.toLowerCase()) &&
      !(
        product.fields.description &&
        product.fields.description.toLowerCase().includes(search.toLowerCase())
      )
    ) {
      return categories;
    }
    if (!product.fields.categories?.length) {
      autres[product.fields.title] = getProductUrl(product);
      return categories;
    }
    product.fields.categories.forEach((category) => {
      categories[category.fields.name] = {
        ...categories[category.fields.name],
        [product.fields.title]: getProductUrl(product),
      };
    });
    return categories;
  }, {});

  const items = layout.navBar.fields.links.reduce((items, link) => {
    if (link.fields.tag == 'products') {
      return items.concat(categories);
    }
    return items.concat([
      {
        slug: link.fields.slug,
        title: link.fields.title,
      },
    ]);
  }, []);
  const onChange = (e) => {
    setSearch(e.target.value);
  };

  const productSlug = layout.navBar.fields.links.find(
    (link) => link.fields.tag == 'products'
  ).fields.slug;
  return (
    <div>
      <Input.Search
        className={styles.search}
        placeholder="Filtrer les créations"
        allowClear
        onChange={onChange}
      />
      <AntdMenu
        defaultSelectedKeys={['1']}
        selectedKeys={[slug]}
        mode="inline"
        className={styles.menu}
        onClick={onSelect}
        forceSubMenuRender
      >
        {items.map((item) => (
          <AntdMenu.Item key="/">
            <Link href={item.slug || ''}>
              <a>{item.title}</a>
            </Link>
          </AntdMenu.Item>
        ))}

        {Object.keys(categories || {})
          .sort()
          .map((category) => (
            <SubMenu
              key={category}
              title={
                <span>
                  <TagsOutlined />
                  <span>{category}</span>
                </span>
              }
            >
              {Object.keys(categories[category])
                .sort()
                .map((name) => (
                  <AntdMenu.Item key={categories[category][name]}>
                    <Link
                      href={
                        productSlug + '/' + categories[category][name] || ''
                      }
                    >
                      <a>{name}</a>
                    </Link>
                  </AntdMenu.Item>
                ))}
            </SubMenu>
          ))}
        {!!Object.keys(autres).length && (
          <SubMenu
            key={'autres'}
            title={
              <span>
                <TagsOutlined />
                <span>autres</span>
              </span>
            }
          >
            {Object.keys(autres)
              .sort()
              .map((name) => (
                <AntdMenu.Item key={autres[name]}>
                  <Link href={autres[name] || ''}>
                    <a>{name}</a>
                  </Link>
                </AntdMenu.Item>
              ))}
          </SubMenu>
        )}
      </AntdMenu>
    </div>
  );
};

export default Menu;
