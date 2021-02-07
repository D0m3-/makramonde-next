import { MenuOutlined } from '@ant-design/icons';
import { Modal, Tag, Tooltip } from 'antd';
import React, { useState } from 'react';
import SiteMenu from '../menu/menu';
import styles from './header.module.less';

const isTest = process.env.STRIPE_ENV === 'test';

const SiteHeader = ({ pageTitle, location }) => {
  const [isMenuOpen, setMenuOpen] = useState();
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
          logo
          <SiteMenu location={location} onSelect={() => setMenuOpen(false)} />
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
      <div className={styles.cart}>cart</div>
    </div>
  );
};
export default SiteHeader;
