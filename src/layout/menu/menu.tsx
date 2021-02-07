import {
  FileTextOutlined,
  HomeOutlined,
  MessageOutlined,
  TagsOutlined,
} from '@ant-design/icons';
import { Input, Menu as AntdMenu } from 'antd';
import Link from 'next/link';
import React, { useState } from 'react';
import styles from './menu.module.less';

const { SubMenu } = AntdMenu;

const getProductUrl = () => {};

const Menu = ({ data, location, onSelect }) => {
  const [search, setSearch] = useState('');
  const autres = [];
  const categories = data?.reduce((categories, product) => {
    if (
      search.length &&
      !product.name.toLowerCase().includes(search.toLowerCase()) &&
      !(
        product.description &&
        product.description.toLowerCase().includes(search.toLowerCase())
      )
    ) {
      return categories;
    }
    if (!product.categories?.length) {
      autres[product.name] = getProductUrl(product);
      return categories;
    }
    product.categories.forEach((category) => {
      categories[category] = {
        ...categories[category],
        [product.name]: getProductUrl(product),
      };
    });
    return categories;
  }, {});
  const onChange = (e) => {
    setSearch(e.target.value);
  };
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
        selectedKeys={[location?.pathname]}
        mode="inline"
        className={styles.menu}
        onClick={onSelect}
        forceSubMenuRender
      >
        <AntdMenu.Item key="/">
          <Link href="/">
            <>
              <HomeOutlined />
              Accueil
            </>
          </Link>
        </AntdMenu.Item>
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
                    <Link href={categories[category][name]}>{name}</Link>
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
                  <Link href={autres[name]}>{name}</Link>
                </AntdMenu.Item>
              ))}
          </SubMenu>
        )}
        <AntdMenu.Item key="/contact">
          <Link href={'/contact'}>
            <>
              <MessageOutlined />À propos
            </>
          </Link>
        </AntdMenu.Item>
        <AntdMenu.Item key="/legal">
          <Link href={'/legal'}>
            <>
              <FileTextOutlined />
              Légal
            </>
          </Link>
        </AntdMenu.Item>
      </AntdMenu>
    </div>
  );
};

export default Menu;
