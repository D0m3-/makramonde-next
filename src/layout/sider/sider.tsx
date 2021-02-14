import React from 'react';
import SiteMenu from '../menu/menu';
import Layout from '../type/Layout';
import styles from './sider.module.less';

type Props = {
  slug: string;
  layout: Layout;
};

const SiteSider = ({ layout, slug }) => {
  return (
    <>
      <div className={styles.container}>logo</div>
      <SiteMenu slug={slug} layout={layout} />
    </>
  );
};

export default SiteSider;
