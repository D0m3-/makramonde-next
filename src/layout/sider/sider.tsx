import React from 'react';
import SiteMenu from '../menu/menu';
import styles from './sider.module.less';

const SiteSider = ({ location }) => {
  return (
    <>
      <div className={styles.container}>logo</div>
      <SiteMenu location={location} />
    </>
  );
};

export default SiteSider;
