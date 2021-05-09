import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import contentfulImageLoader from '../../util/contentfulImageLoader';
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
            {layout.navBar.logo.url && (
              <Image
                className={styles.logo}
                src={layout.navBar.logo.url}
                width="200"
                height="30"
                layout="fixed"
                quality={90}
                alt={`${layout.navBar.logo.description}`}
                loader={contentfulImageLoader}
                priority
              />
            )}
          </a>
        </Link>
      </div>
      <SiteMenu layout={layout} />
    </>
  );
};

export default SiteSider;
