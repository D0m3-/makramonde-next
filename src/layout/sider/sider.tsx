import Image from 'next/image';
import Link from 'next/link';
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
      <div className={styles.container}>
        <Link href="/">
          <a>
            <Image src="/images/MAKRA22.png" width="732" height="110" />
          </a>
        </Link>
      </div>
      <SiteMenu slug={slug} layout={layout} />
    </>
  );
};

export default SiteSider;
