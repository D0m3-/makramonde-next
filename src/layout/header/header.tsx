import { MenuOutlined } from '@ant-design/icons';
import { Modal, Tag, Tooltip } from 'antd';
import { Entry } from 'contentful';
import Image from 'next/image';
import React, { useState } from 'react';
import { IUniqueProductFields } from '../../../@types/generated/contentful';
import CartButton from '../../cart/CartButton';
import Arrows from '../../product/Arrows';
import SiteMenu from '../menu/menu';
import Layout from '../type/Layout';
import styles from './header.module.less';

const isTest = process.env.NEXT_PUBLIC_STRIPE_ENV === 'test';

const SiteHeader = ({
  pageTitle,
  layout,
  product,
}: {
  pageTitle: string;
  layout: Layout;
  product?: Entry<IUniqueProductFields>;
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
          <SiteMenu layout={layout} onSelect={() => setMenuOpen(false)} />
        </Modal>
      </div>

      <div className={styles.titleContainer}>
        <Arrows layout={layout} product={product} className={styles.arrow}>
          <>
            {isTest && (
              <Tooltip
                title="Site de test ! Les produits et le paiement ne sont pas réels !"
                trigger={['hover', 'focus', 'click']}
              >
                <Tag color="warning">Test</Tag>
              </Tooltip>
            )}
            <h1 className={styles.title}>{pageTitle}</h1>
          </>
        </Arrows>
      </div>
      <div className={styles.cart}>
        <CartButton />
      </div>
    </div>
  );
};
export default SiteHeader;
