import React from 'react';
import SiteMenu from '../menu/menu';
import styles from './sider.module.less';

const SiteSider = ({ layout, slug }) => {
  return (
    <>
      <div className={styles.container}>logo</div>
      <SiteMenu slug={slug} layout={layout} />
    </>
  );
};

export default SiteSider;
