import { MenuOutlined } from '@ant-design/icons';
import { Modal, Tag, Tooltip } from 'antd';
import Image from 'next/image';
import React, { useState } from 'react';
import CartButton from '../../cart/CartButton';
import SiteMenu from '../menu/menu';
import Layout from '../type/Layout';
import styles from './header.module.less';

const isTest = process.env.NEXT_PUBLIC_STRIPE_ENV === 'test';

const SiteHeader = ({
  pageTitle,
  layout,
  slug,
}: {
  pageTitle: string;
  layout: Layout;
  slug: string;
}) => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  return (
    <div className={styles.container}>
      <div className={styles.menu}>
        <MenuOutlined
          className={styles.menuIcon}
          onClick={() => setMenuOpen(true)}
        />
        <Modal
          visible={isMenuOpen}
          onCancel={() => setMenuOpen(false)}
          footer={null}
        >
          <Image src="/images/MAKRA22.png" width="732" height="110" />
          <SiteMenu
            slug={slug}
            layout={layout}
            onSelect={() => setMenuOpen(false)}
          />
        </Modal>
      </div>

      <div className={styles.titleContainer}>
        {isTest && (
          <Tooltip
            title="Site de test ! Les produits et le paiement ne sont pas réels !"
            trigger={['hover', 'focus', 'click']}
          >
            <Tag color="warning">Test</Tag>
          </Tooltip>
        )}
        <h1 className={styles.title}>{pageTitle}</h1>
      </div>
      <div className={styles.cart}>
        <CartButton />
      </div>
    </div>
  );
};
export default SiteHeader;
