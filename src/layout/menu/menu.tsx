import { TagsOutlined } from '@ant-design/icons';
import { Input, Menu as AntdMenu } from 'antd';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useMemo, useState } from 'react';
import contentfulImageLoader from '../../util/contentfulImageLoader';
import Layout from '../type/Layout';
import styles from './menu.module.less';

const { SubMenu } = AntdMenu;

type Props = {
  layout: Layout;
  onSelect?: () => void;
};

const Menu = ({ layout, onSelect }: Props) => {
  const [search, setSearch] = useState('');
  const categories = useMemo(
    () =>
      search.length
        ? layout.categories.filter((category) => {
            return category.products.filter((productId) => {
              const product = layout.products[productId];
              return product.title.toLowerCase().includes(search.toLowerCase());
              /*&& !(
        product.description &&
        documentToPlainTextString(product.fields.description)
        .toLowerCase()
        .includes(search.toLowerCase())*/
            }).length;
          })
        : layout.categories,
    [search, layout]
  );
  const router = useRouter();

  const onChange = (e) => {
    setSearch(e.target.value);
  };

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
        selectedKeys={[router.asPath]}
        mode="inline"
        className={styles.menu}
        onClick={onSelect}
        forceSubMenuRender
        inlineIndent={10}
      >
        {layout.items.map((item) =>
          item.type === 'products' ? (
            categories.map((category) => (
              <SubMenu
                key={category.title}
                title={
                  <span>
                    <TagsOutlined />
                    <span>{category.title}</span>
                  </span>
                }
              >
                {category.products.map((productId) => {
                  const product = layout.products[productId];
                  return (
                    <AntdMenu.Item
                      key={product.slug}
                      icon={
                        product.image && (
                          <Image
                            src={product.image.url}
                            width={32}
                            height={32}
                            layout="fixed"
                            alt={`${product.image.description}`}
                            loader={contentfulImageLoader}
                            objectFit="contain"
                            className={styles.image}
                          />
                        )
                      }
                    >
                      <Link href={product.slug}>
                        <a className={styles.link}>{product.title}</a>
                      </Link>
                    </AntdMenu.Item>
                  );
                })}
              </SubMenu>
            ))
          ) : (
            <AntdMenu.Item key={'/' + (item.slug === '/' ? '' : item.slug)}>
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
