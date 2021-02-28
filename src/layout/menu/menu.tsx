import { TagsOutlined } from '@ant-design/icons';
import { Input, Menu as AntdMenu } from 'antd';
import Link from 'next/link';
import React, { useState } from 'react';
import {
  layoutProductsToCategories,
  layoutToMenu,
} from '../../transform/layoutTransform';
import { getProductSlugFactory } from '../../util/product';
import Layout from '../type/Layout';
import styles from './menu.module.less';

const { SubMenu } = AntdMenu;

type Props = {
  slug: string;
  layout: Layout;
  onSelect?: () => void;
};

const Menu = ({ layout, slug, onSelect }: Props) => {
  const [search, setSearch] = useState('');
  const categories = layoutProductsToCategories({ layout, search });

  const items = layoutToMenu({ layout });
  const onChange = (e) => {
    setSearch(e.target.value);
  };

  const getProductSlug = getProductSlugFactory({ layout });

  return (
    <>
      <Input.Search
        placeholder="Filtrer les créations"
        allowClear
        onChange={onChange}
        className={styles.search}
      />
      <AntdMenu
        defaultSelectedKeys={['1']}
        selectedKeys={[slug]}
        mode="inline"
        className={styles.menu}
        onClick={onSelect}
        forceSubMenuRender
      >
        {items.map((item) =>
          item.type === 'products' ? (
            Object.keys(categories || {})
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
                  {Object.values(categories[category])
                    .sort()
                    .map((product) => (
                      <AntdMenu.Item key={product.sys.id}>
                        <Link href={getProductSlug(product)}>
                          <a>{product.fields.title}</a>
                        </Link>
                      </AntdMenu.Item>
                    ))}
                </SubMenu>
              ))
          ) : (
            <AntdMenu.Item key="/">
              <Link href={'/' + (item.slug === '/' ? '' : item.slug)}>
                <a>{item.title}</a>
              </Link>
            </AntdMenu.Item>
          )
        )}
      </AntdMenu>
    </>
  );
};

export default Menu;
