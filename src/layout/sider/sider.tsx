import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import SiteMenu from '../menu/menu';
import Layout from '../type/Layout';
import styles from './sider.module.less';

type Props = {
  layout: Layout;
};

const SiteSider = ({ layout }: Props) => {
  return (
    <>
      <div className={styles.container}>
        <Link href="/">
          <a>
            <Image
              src="/images/MAKRA200.png"
              width="200"
              height="30"
              layout="fixed"
              quality={90}
            />
          </a>
        </Link>
      </div>
      <SiteMenu layout={layout} />
    </>
  );
};

export default SiteSider;
